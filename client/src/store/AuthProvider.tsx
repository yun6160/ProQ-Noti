'use client';

import { supabase } from '@/utils/supabase/client';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { storeLogin, storeLogout } from './authSlice';
import { useToast } from '@/hooks/useToast';

export default function AuthProvider() {
  const dispatch = useDispatch();
  const firstMount = useRef(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session) {
        dispatch(
          storeLogin({
            userId: session.user.id,
            email: session.user.email ?? null
          })
        );
      } else {
        dispatch(storeLogout());
      }
    };

    checkSession();

    // 실시간 세션 감지
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          dispatch(
            storeLogin({
              userId: session.user.id,
              email: session.user.email ?? null
            })
          );
          if (!firstMount.current) {
            toast({
              description: '로그인 되었습니다.'
            });
          }
        } else {
          dispatch(storeLogout());
          if (!firstMount.current) {
            toast({
              description: '로그아웃 되었습니다.'
            });
          }
        }

        firstMount.current = false;
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return null;
}
