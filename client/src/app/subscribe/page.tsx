"use client";

import { Layout } from '@/components/Layout';
import SubscribeList from '../../components/subscribeList';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubscribePage() {
  const router = useRouter();
  const [teamName, setTeamName] = useState("HLE");
  const dummyArr = [
    {
      name: 'zeus',
      isLive: true,
      isSubscribe: true
    },
    {
      name: 'peanut',
      isLive: false,
      isSubscribe: true
    },
    {
      name: 'zeka',
      isLive: true,
      isSubscribe: false
    },
    {
      name: 'viper',
      isLive: true,
      isSubscribe: true
    },
    {
      name: 'delight',
      isLive: true,
      isSubscribe: true
    }
  ];
  return (
    <>
      <Layout>
        <Layout.Header title={teamName} handleBack={() => router.back()} />
        <Layout.Main>
          <SubscribeList list={dummyArr} />
        </Layout.Main>
      </Layout>
    </>
  );
}
