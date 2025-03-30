import { useEffect, useState } from 'react';
import { GET } from '@/app/api/subscribe/route';
import { GET as GET_TEAM } from '@/app/api/team/route';
import { gammerInfo, Team } from '@/types';
import { useToast } from '@/hooks/use-toast';

export function usePlayerList(team: string) {
  const [members, setMembers] = useState<gammerInfo[]>([]);
  const { toast } = useToast();

  const getMembers = async () => {
    const response = await GET(team);

    if (Array.isArray(response)) {
      setMembers(response);
      toast({ description: '업뎃 완료🎉' });
    } else if (response.status === 500) {
      toast({
        description:
          '선수 목록을 불러 올 수 없습니다. 잠시 후 다시 시도해 주세요.'
      });
    }
  };

  useEffect(() => {
    if (!team) return;

    getMembers();
    const interval = setInterval(getMembers, 3 * 60 * 1000);

    return () => clearInterval(interval);
  }, [team]);

  return { members };
}

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);

  const getTeams = async () => {
    try {
      const response = await GET_TEAM();

      if (Array.isArray(response)) {
        setTeams(response);
      } else if (response.status == 500) {
        console.error('Error fetching teams:', response.body.error);
      }
    } catch (error) {
      console.error('Unexpected error fetching teams:', error);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  return { teams };
}
