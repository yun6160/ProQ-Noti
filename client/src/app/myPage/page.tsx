'use client';

import { Layout } from '@/components/Layout';
import DeleteAccountModal from '@/components/modal/DeleteAccountModal';
import SubscribeList from '@/components/subscribeList';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const dummyArr = [
  {
    id: 1,
    pro_name: 'Zeus',
    puuid: 'puuid-1234',
    summoner_name: 'Hide on bush',
    tag_line: 'KR1',
    is_online: true,
    created_at: '2024-01-01T12:00:00Z',
    team_id: 101,
    last_online: null,
    account_id: 1
  },
  {
    id: 2,
    pro_name: 'Faker',
    puuid: 'puuid-5678',
    summoner_name: 'The Unkillable Demon King',
    tag_line: 'KR2',
    is_online: false,
    created_at: '2024-01-02T15:30:00Z',
    team_id: 101,
    last_online: '2024-03-30T08:45:00Z',
    account_id: 2
  },
  {
    id: 3,
    pro_name: 'Deft',
    puuid: 'puuid-9999',
    summoner_name: 'Blue Arrow',
    tag_line: 'KR3',
    is_online: true,
    created_at: null,
    team_id: null,
    last_online: null,
    account_id: 3
  }
];

export default function MyPage() {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


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
        <div className="flex justify-center pt-16 pb-10">
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-6 py-2 text-sm text-gray-500 underline hover:text-red-600 transition-colors"
          >
            회원탈퇴
          </button>
        </div>
      </Layout.Main>
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </Layout>
  );
}
