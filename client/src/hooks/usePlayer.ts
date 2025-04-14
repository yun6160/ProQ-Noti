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
    isPending: loading,
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
    if (!team) return;

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
          // 예시: players 쿼리 데이터를 가져오기
          const currentMembers = queryClient.getQueryData<gamerInfo[]>([
            'players',
            team
          ]);
          if (!currentMembers) return;

          const updatedTeamId = Number(payload.new?.team_id);
          if (updatedTeamId !== teamId) return;

          const newOnline = payload.new?.is_online;
          let oldOnline = null;

          for (const member of currentMembers) {
            if (member.id === payload.new?.pro_user_id) {
              oldOnline = member.is_online;
              if (newOnline !== oldOnline) {
                if (debounceTimer) {
                  clearTimeout(debounceTimer);
                }

                const newTimer = setTimeout(() => {
                  queryClient.invalidateQueries({
                    queryKey: ['players', team, userId]
                  });
                  toast({ description: '🎉실시간 업데이트 완료🎉' });
                }, 1000);

                // 타이머 상태 업데이트
                setDebounceTimer(newTimer);
              }
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [team, teamId, queryClient]);

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
