'use client';

import { Layout } from '@/components/Layout';
import SubscribeList from '@/components/subscribeList';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { GET } from '@/app/api/subscribe/route';
import { gammerInfo } from '@/types';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '@/store/authSlice';

export default function SubscribePage() {
  const router = useRouter();
  const params = useParams();
  const team = decodeURIComponent(params.team as string);
  const [teamName, setTeamName] = useState<string>('');
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<gammerInfo[]>(
    []
  );

  useEffect(() => {
    setTeamName(team || '');
    const getMembers = async () => {
      const response = await GET(team);

      if (Array.isArray(response)) {
        setSelectedTeamMembers(response);
      } else if (response.status === 500) {
        console.error('Error fetching team members:', response.body.error);
      }
    };
    getMembers();

    return () => {
      setTeamName('');
    };
  }, [team]);

  return (
    <>
      <Layout>
        <Layout.Header title={teamName} handleBack={() => router.back()} />
        <Layout.Main>
          <SubscribeList list={selectedTeamMembers} />
        </Layout.Main>
      </Layout>
    </>
  );
}
