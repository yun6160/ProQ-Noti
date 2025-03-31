'use client';

import { Layout } from '@/components/Layout';
import { TeamGrid } from '@/components/TeamGrid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTeams } from '@/hooks/usePlayer';

export default function Page() {
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const { teams } = useTeams();

  const handleSelectTeam = (team: string) => {
    setSelectedTeam(team);
    router.push(`/subscribe/${team}`);
  };

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
