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
    console.log('선택한 팀:', team.join(' '));
    // 필요한 경우, 선택한 팀으로 라우터 이동 가능
    // router.push(`/team/${team[0]}`); 이런식으로도 활용 가능
  };

  return (
    <Layout>
      <Layout.Header title="소속 팀 선택" />
      <TeamGrid onSelectTeam={handleSelectTeam} />
    </Layout>
  );
}
