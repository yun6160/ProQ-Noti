'use client';

import { supabase } from "@/utils/supabase/client";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { storeLogin, storeLogout } from "./authSlice";

export default function AuthProvider () {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      
      if (session) {
        dispatch(storeLogin());
      } else {
        dispatch(storeLogout());
      }
    };

    checkSession();

    // 실시간 세션 감지
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch(storeLogin());
      } else {
        dispatch(storeLogout());
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return null;
};