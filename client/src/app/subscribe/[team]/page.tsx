'use client';

import { Layout } from '@/components/Layout';
import SubscribeList from '@/components/subscribeList';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '@/store/authSlice';
import { usePlayerList } from '@/hooks/usePlayer';
import SubscribeListSkeleton from '@/components/SubscribeSkeleton';

export default function SubscribePage() {
  const router = useRouter();
  const params = useParams();
  const team = decodeURIComponent(params.team as string);
  const [teamName, setTeamName] = useState<string>('');
  const { members, loading: dataLoading } = usePlayerList(team);
  const [minLoading, setMinLoading] = useState(true);

  useEffect(() => {
    setTeamName(team || '');
    const timer = setTimeout(() => setMinLoading(false), 500);
    return () => {
      setTeamName('');
      clearTimeout(timer);
    };
  }, [team]);

  const loading = dataLoading || minLoading;

  return (
    <>
      <Layout>
        <Layout.Header title={teamName} handleBack={() => router.back()} />
        <Layout.Main>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <SubscribeListSkeleton />
            </div>
          ) : (
            <SubscribeList list={members} />
          )}
        </Layout.Main>
      </Layout>
    </>
  );
}
