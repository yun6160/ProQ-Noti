'use client';

import { Layout } from '@/components/Layout';
import { TeamGrid } from '@/components/TeamGrid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GET } from './api/team/route';
import { Team } from '@/types';

export default function Page() {
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);

  const handleSelectTeam = (team: string) => {
    setSelectedTeam(team);
    router.push(`/subscribe/${team}`);
  };

  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await GET();

        if (Array.isArray(response)) {
          setTeams(response);
        } else if (response.status == 500) {
          console.error('Error fetching teams:', response.body.error);
        }
      } catch (error) {
        console.error('Unexpected error fetching teams:', error);
      }
    };
    getTeams();
  }, []);

  return (
    <Layout>
      <Layout.Header title="소속 팀 선택" handleBack={() => router.back()} />
      <Layout.Main>
        <div className="flex justify-center items-center h-full">
          <TeamGrid onSelectTeam={handleSelectTeam} teamList={teams} />
        </div>
      </Layout.Main>
    </Layout>
  );
}
