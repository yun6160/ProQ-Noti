"use client";
import { signInWithGoogle, signInWithKakao } from "@/utils/supabase/actions";

export default function Login() {

  return (
    <div className="flex justify-center items-center">
      <button onClick={signInWithKakao} className="bg-yellow-400 text-black px-6 py-2 rounded-md font-bold hover:bg-yellow-500">
        카카오 로그인
      </button>
      <button onClick={signInWithGoogle} className="bg-white border border-gray-300 rounded-lg shadow-md">
        구글 로그인
      </button>
    </div>
  );
}