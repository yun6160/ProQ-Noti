import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GET, GET_TEAM_ID } from '@/app/api/subscribe/route';
import { GET as GET_TEAM } from '@/app/api/team/route';
import { gamerInfo, Team } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { TABLES } from '@/constant/db';
import { useUserId } from '@/utils/hooks/userAuth';

export function usePlayerList(team: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [teamId, setTeamId] = useState<number | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const userId = useUserId();

  // 해당 팀의 team_id 가져오기
  useEffect(() => {
    if (!team) return;

    const fetchTeamId = async () => {
      try {
        const teamId = await GET_TEAM_ID(team);

        setTeamId(teamId);
      } catch (e) {
        console.error('error:', e);
      }
    };

    fetchTeamId();
  }, [team]);

  const {
    data: members = [],
    isLoading: loading,
    error
  } = useQuery<gamerInfo[]>({
    queryKey: ['players', team, userId],
    queryFn: async () => {
      const response = await GET(team, userId ?? undefined);
      if (!Array.isArray(response)) {
        throw new Error('서버 오류');
      }
      return response;
    },
    enabled: !!team
  });

  if (error) {
    toast({
      description:
        '선수 목록을 불러 올 수 없습니다. 잠시 후 다시 시도해 주세요.'
    });
  }

  // 선수 online 상태 테이블 실시간 업데이트
  useEffect(() => {
    if (!team || loading) return; // 데이터가 로딩 중일 경우 리턴

    const channel = supabase
      .channel('realtime-players')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: TABLES.RIOT_ACCOUNTS
        },
        (payload) => {
          const currentMembers = queryClient.getQueryData<gamerInfo[]>([
            'players',
            team
          ]);
          if (!currentMembers) return;

          const newOnline = payload.new?.is_online;
          const proUserId = payload.new?.pro_user_id;
          const accountId = payload.new?.id;

          // 현재 팀의 선수인지, 선수이면 누구인지 리턴
          const currentMember = currentMembers.find(
            (member) => member.id === proUserId
          );

          if (!currentMember) return;

          console.log('payload:', payload);

          const oldOnline = currentMember.is_online;
          //새로 받아온게 지금 보는 계정이 아닌 다른 부계정이고 상태가 online이면 새로고침
          if (currentMember.account_id !== accountId) {
            if (newOnline) {
              if (debounceTimer) {
                clearTimeout(debounceTimer);
              }
              const newTimer = setTimeout(() => {
                queryClient.invalidateQueries({
                  queryKey: ['players', team, userId]
                });
                toast({ description: '🎉실시간 업데이트 완료🎉' });
              }, 3000);
              // 타이머 상태 업데이트
              setDebounceTimer(newTimer);
            }
          }

          // 새로 받아온 계정이 지금 보는 계정이고 상태가 바뀌었으면
          if (currentMember.account_id === accountId) {
            if (newOnline !== oldOnline) {
              if (debounceTimer) {
                clearTimeout(debounceTimer);
              }

              const newTimer = setTimeout(() => {
                queryClient.invalidateQueries({
                  queryKey: ['players', team, userId]
                });

                toast({ description: '🎉실시간 업데이트 완료🎉' });
              }, 3000);

              // 타이머 상태 업데이트
              setDebounceTimer(newTimer);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [team, teamId, queryClient, loading]);

  return { members, loading };
}

export function useTeams() {
  const {
    data: teams = [],
    isLoading,
    error
  } = useQuery<Team[]>({
    queryKey: ['teams'],
    queryFn: async () => {
      const response = await GET_TEAM();
      if (!Array.isArray(response)) {
        throw new Error(response?.body?.error || '서버 오류');
      }
      return response;
    }
  });

  return { teams, isLoading, error };
}
