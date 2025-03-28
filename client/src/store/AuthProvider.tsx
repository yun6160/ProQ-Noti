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
  }, [dispatch]);

  return null;
};