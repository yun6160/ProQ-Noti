'use client';

import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">카카오 로그인</h1>
      <button 
        className="bg-yellow-400 text-black px-6 py-2 rounded-md font-bold hover:bg-yellow-500"
        onClick={() => signIn("kakao", { callbackUrl: "/app/dashboard" })}
      >
        카카오 로그인
      </button>
    </div>
  );
};

export default Login;