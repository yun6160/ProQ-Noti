'use client';

import { Layout } from '@/components/Layout';
import SubscribeList from '@/components/subscribeList';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { usePlayerList } from '@/hooks/usePlayer';
import SubscribeListSkeleton from '@/components/SubscribeSkeleton';
import { getToken } from 'firebase/messaging';
import { getFirebaseMessaging } from '@/lib/firebase';
import { getDeviceType } from '@/utils/device';
import { useIsLoggedIn, useUserId } from '@/hooks/useAuth';
import { POST } from '@/app/api/register/route';

export default function SubscribePage() {
  const router = useRouter();
  const params = useParams();
  const team = decodeURIComponent(params.team as string);
  const [teamName, setTeamName] = useState<string>('');
  const { members, loading: dataLoading } = usePlayerList(team);
  const [minLoading, setMinLoading] = useState(true);
  const isLoggedIn = useIsLoggedIn();
  const userId = useUserId();
  const messaging = getFirebaseMessaging();

  useEffect(() => {
    setTeamName(team || '');
    const timer = setTimeout(() => setMinLoading(false), 200);

    if (typeof window === 'undefined') return;

    const permission = Notification.permission;

    if (isLoggedIn) {
      if ('Notification' in window && permission === 'default') {
        Notification.requestPermission().then((result) => {
          if (result === 'granted' && messaging) {
            getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
            }).then((currentToken) => {
              if (currentToken) {
                const deviceType = getDeviceType();
                // FCM 토큰을 서버에 저장하는 API 호출
                if (userId) {
                  const result = POST(userId, currentToken, deviceType)
                    .then((res) => {
                      if (res.status === 'success') {
                        console.log(currentToken);
                      } else {
                        console.warn('FCM 토큰 저장 실패:', res.message);
                      }
                    })
                    .catch((error) => {
                      console.error('FCM 토큰 저장 중 오류 발생:', error);
                    });
                } else {
                  console.warn(
                    '로그인 되지 않은 상태에서 FCM 토큰을 저장할 수 없습니다.'
                  );
                }
              } else {
                console.warn('fcm 토큰을 가져올 수 없습니다.');
              }
            });
          }
        });
      }
    }

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
