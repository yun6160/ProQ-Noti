'use client';

import { Layout } from '@/components/Layout';
import { TeamGrid } from '@/components/TeamGrid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GET } from './api/team/route';

export default function Page() {
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState<string[] | null>(null);

  const handleSelectTeam = (team: string[]) => {
    setSelectedTeam(team);
    router.push(`/subscribe/${team[0]}`);
  };

  useEffect(() => {
    const getTeams = async () => {
      const teamList = await GET();
      console.log(teamList);
    };
    getTeams();
  }, []);

  return (
    <Layout>
      <Layout.Header title="소속 팀 선택" handleBack={() => router.back()} />
      <Layout.Main>
        <div className="pt-8 screen:pt-12">
          <TeamGrid onSelectTeam={handleSelectTeam} />
        </div>
      </Layout.Main>
    </Layout>
  );
}
