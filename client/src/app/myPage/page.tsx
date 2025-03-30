"use client"

import { Layout } from "@/components/Layout";
import SubscribeList from "@/components/subscribeList";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const router = useRouter();
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
    <Layout>
      <Layout.Header title="마이페이지" handleBack={() => router.back()} />
      <Layout.Main>
        <div className="pl-10 pt-10 web:pl-32">
          <h2 className="text-2xl web:text-3xl font-bold">구독 목록</h2>
        </div>
        <div className="pt-10 web:pt-20">
          <SubscribeList list={dummyArr} />
        </div>
      </Layout.Main>
    </Layout>
  );
}