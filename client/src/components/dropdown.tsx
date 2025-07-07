import { useToast } from '@/hooks/useToast';
import useOutsideClick from '@/hooks/useOutsideClick';
import { isLoggedIn as selectIsLoggedIn, storeLogout } from '@/store/authSlice';
import { useIsLoggedIn, useUserId } from '@/hooks/useAuth';
import { signOut } from '@/utils/supabase/actions';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { getFirebaseMessaging } from '@/lib/firebase';
import { getToken } from '@firebase/messaging';
import { getDeviceType } from '@/utils/device';
import { POST } from '@/app/api/register/route';

interface DropdownProps {
  isOpen?: boolean;
}

const Dropdown = ({ isOpen = false }: DropdownProps) => {
  const [open, setOpen] = useState(isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const isLoggedIn = useIsLoggedIn();
  const messaging = getFirebaseMessaging();
  const userId = useUserId();

  useOutsideClick(dropdownRef as React.RefObject<HTMLElement>, () =>
    setOpen(false)
  );

  const handleLogout = () => {
    signOut();
    dispatch(storeLogout());
    toast({
      description: '로그아웃 되었습니다.'
    });
  };

  const reToken = () => {
    if (typeof window === 'undefined') {
      toast({ description: '알림이 재설정됐습니다' });
      return;
    }

    if (isLoggedIn) {
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
                      toast({ description: '알림이 재설정됐습니다' });
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
        } else {
          toast({ description: '알림을 허용해주세요' });
        }
      });
    }
  };

  return (
    <div ref={dropdownRef} className="absolute right-1 flex items-center">
      <button
        className="bg-none border-none cursor-pointer outline-none p-0"
        onClick={() => setOpen(!open)}
      >
        <GiHamburgerMenu size={25} className="text-primary-navy" />
      </button>
      {open && (
        <div className="absolute top-8 right-0 bg-white shadow-md rounded z-50 border border-gray-300 text-base text-black web:w-[10rem] w-[6rem]">
          <ul className="list-none p-0 m-0">
            <li className="border-b border-gray-300 text-center hover:bg-gray-100 cursor-pointer">
              <Link href="/" className="block p-2 text-black no-underline">
                메인 화면
              </Link>
            </li>
            {!isLoggedIn && (
              <li className="border-b border-gray-300 text-center hover:bg-gray-100 cursor-pointer">
                <Link
                  href="/login"
                  className="block p-2 text-black no-underline"
                >
                  로그인
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="text-center hover:bg-gray-100 cursor-pointer">
                <button
                  onClick={handleLogout}
                  className="block p-2 w-full text-black"
                >
                  로그아웃
                </button>
              </li>
            )}
            {isLoggedIn && (
              <li className="text-center hover:bg-gray-100 cursor-pointer">
                <button
                  onClick={reToken}
                  className="block p-2 w-full text-black"
                >
                  알림 재설정
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
