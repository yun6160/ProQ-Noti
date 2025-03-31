import { useQuery } from '@tanstack/react-query';
import { GET } from '@/app/api/subscribe/route';
import { GET as GET_TEAM } from '@/app/api/team/route';
import { gamerInfo, Team } from '@/types';
import { useToast } from '@/hooks/use-toast';

export function usePlayerList(team: string) {
  const { toast } = useToast();

  const {
    data: members = [],
    isLoading: loading,
    error
  } = useQuery<gamerInfo[]>({
    queryKey: ['players', team],
    queryFn: async () => {
      const response = await GET(team);
      if (!Array.isArray(response)) {
        throw new Error('서버 오류');
      }
      return response;
    },
    enabled: !!team // team이 존재할 때만 요청 실행
  });

  if (error) {
    toast({
      description:
        '선수 목록을 불러 올 수 없습니다. 잠시 후 다시 시도해 주세요.'
    });
  }

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
