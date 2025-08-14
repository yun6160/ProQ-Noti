'use client';

import { Layout } from '@/components/Layout';
import DeleteAccountModal from '@/components/modal/DeleteAccountModal';
import SubscribeList from '@/components/subscribeList';
import { useIsLoggedIn, useUserId } from '@/hooks/useAuth';
import { IProPlayerData } from '@/types';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Mypage() {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subscribeList, setSubscribeList] = useState<IProPlayerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = useUserId();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    const fetchSubscribeList = async () => {
      if (!isLoggedIn || !userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data: subscriptions, error: subscriptionsError } = await supabase
          .from('subscribe')
          .select(`
            riot_pro_user_id,
            created_at,
            riot_pro_users (
              id,
              pro_name,
              team_id,
              position_number,
              is_starter
            )
          `)
          .eq('user_id', userId);

        if (subscriptionsError) {
          throw new Error('구독 목록을 가져오는데 실패했습니다.');
        }

        if (!subscriptions || subscriptions.length === 0) {
          setSubscribeList([]);
          return;
        }

        const riotProUserIds = subscriptions.map(sub => sub.riot_pro_user_id);
        
        const { data: proPlayersDetails, error: detailsError } = await supabase
          .from('riot_pro_users')
          .select('*')
          .in('account_id', riotProUserIds);

        if (detailsError) {
          console.error('프로게이머 세부 정보 조회 실패:', detailsError);
        }

        const combinedData = subscriptions.map(subscription => {
          const proPlayerDetail = proPlayersDetails?.find(
            player => player.id === subscription.riot_pro_user_id
          );

          return {
            id: subscription.riot_pro_user_id,
            pro_name: subscription.riot_pro_users?.pro_name || 'Unknown',
            position_number: subscription.riot_pro_users?.position_number || 0,
            is_starter: subscription.riot_pro_users?.is_starter || false,
            created_at: subscription.created_at,
            team_id: subscription.riot_pro_users?.team_id || null,
            account_id: subscription.riot_pro_user_id,
            is_subscribed: true
          };
        });

        setSubscribeList(combinedData as unknown as IProPlayerData[]);
      } catch (err) {
        console.error('구독 목록 조회 실패:', err);
        setError(err instanceof Error ? err.message : '구독 목록을 가져오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribeList();
  }, [userId, isLoggedIn]);

  const handleUnsubscribe = async (proId: number) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('subscribe')
        .delete()
        .match({ user_id: userId, riot_pro_user_id: proId });

      if (error) {
        throw new Error('구독 취소에 실패했습니다.');
      }

      setSubscribeList(prev => prev.filter(player => player.id !== proId));
    } catch (error) {
      console.error('구독 취소 실패:', error);
    }
  };

  return (
    <Layout>
      <Layout.Header title="마이페이지" handleBack={() => router.back()} />
      <Layout.Main>
        <div className="h-full w-full relative">
          <div className="w-full pl-10 pt-10 web:pl-32">
            <h2 className="text-2xl font-bold">구독 목록</h2>
            {!loading && subscribeList.length > 0 && (
              <p className="text-gray-600 mt-2">총 {subscribeList.length}명의 프로게이머를 구독중입니다.</p>
            )}
          </div>
          
          <div className="pt-10 web:pt-20">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-mint"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    다시 시도
                  </button>
                </div>
              </div>
            ) : subscribeList.length === 0 ? (
              <div className="flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-bottom p-8 w-[20.69rem] web:w-[30rem] text-center">
                  <div className="mb-4">
                    <svg 
                      className="mx-auto h-12 w-12 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    구독한 프로게이머가 없습니다
                  </h3>
                  <p className="text-gray-500 mb-4">
                    관심 있는 프로게이머를 구독해보세요!
                  </p>
                  <button
                    onClick={() => router.push('/')}
                    className="px-4 py-2 bg-primary-mint text-white rounded-md hover:bg-primary-mint/80 transition-colors"
                  >
                    프로게이머 둘러보기
                  </button>
                </div>
              </div>
            ) : (
              <SubscribeList
                list={subscribeList} 
                onUnsubscribe={handleUnsubscribe}
              />
            )}
          </div>
          
          <div className="flex justify-center pt-16 pb-10">
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="absolute bottom-10 right-10 px-6 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </Layout.Main>
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </Layout>
  );
}
