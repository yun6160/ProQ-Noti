'use client';

import { Layout } from '@/components/Layout';
import SubscribeList from '@/components/subscribeList';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '@/store/authSlice';
import { usePlayerList } from '@/hooks/usePlayer';

export default function SubscribePage() {
  const router = useRouter();
  const params = useParams();
  const team = decodeURIComponent(params.team as string);
  const [teamName, setTeamName] = useState<string>('');
  const { members } = usePlayerList(team);

  useEffect(() => {
    setTeamName(team || '');
    return () => {
      setTeamName('');
    };
  }, [team]);

  return (
    <>
      <Layout>
        <Layout.Header title={teamName} handleBack={() => router.back()} />
        <Layout.Main>
          <SubscribeList list={members} />
        </Layout.Main>
      </Layout>
    </>
  );
}
