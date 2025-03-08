'use client';

import { Layout } from '@/components/Layout';
import { TeamGrid } from '@/components/TeamGrid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState<string[] | null>(null);

  const handleSelectTeam = (team: string[]) => {
    setSelectedTeam(team);
    router.push(`/subscribe/${team[0]}`);
  };

  return (
    <Layout>
      <Layout.Header title="소속 팀 선택" />
      <Layout.Main>
        <TeamGrid onSelectTeam={handleSelectTeam} />
      </Layout.Main>
    </Layout>
  );
}
