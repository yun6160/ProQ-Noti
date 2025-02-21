"use client";
import { useEffect, useState } from "react";

const Dashboard = async () => {
  // const [user, setUser] = useState<any>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const { data: { user }, error } = await supabase.auth.getUser();
  //     setUser(user);
  //   };

  //   fetchUser();
  // }, []);

  // if (loading) {
  //   return <p>로딩중</p>
  // }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* {user ? (
        <>
          <h1 className="text-2xl font-bold">{user.email}</h1>
          <img src={user.user_metadata?.picture} alt="Profile" className="w-24 h-24 rounded-full mt-4" />
        </>
      ) : (
        <p>로그인 안됨</p>
      )} */}
    </div>
  );
};

export default Dashboard;