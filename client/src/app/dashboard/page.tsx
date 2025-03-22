'use client';

import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

interface Users {
  avatar_url: string | null;
  email: string;
  id: string;
  user_name: string | null;
}

export default function Dashboard() {
  const [user, setUser] = useState<Users>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session) {
        const { data: profile, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) setUser(profile);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        로딩중입니다...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {user ? (
        <ul className="mt-4">
          <li>
            <strong>ID:</strong> {user.id}
          </li>
          <li>
            <strong>Email:</strong> {user.email}
          </li>
          <li>
            <strong>Username:</strong> {user.user_name}
          </li>
          {user.avatar_url && (
            <img
              src={user.avatar_url}
              alt="Avatar"
              className="w-20 h-20 rounded-full mt-2"
            />
          )}
        </ul>
      ) : (
        <p className="text-red-500">유저 정보 못찾았습니다.</p>
      )}
    </div>
  );
}
