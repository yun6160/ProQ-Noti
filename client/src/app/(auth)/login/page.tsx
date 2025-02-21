"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Login() {
  const supabase = createClientComponentClient();

  const handleKakaoLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/auth/callback/kakao`,
      },
    });
  };

  return (
    <button onClick={handleKakaoLogin} className="bg-yellow-400 text-black px-6 py-2 rounded-md font-bold hover:bg-yellow-500">
      카카오 로그인
    </button>
  );
}