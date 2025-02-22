"use client";
import { signInWithKakao } from "@/utils/supabase/actions";

export default function Login() {

  return (
    <button onClick={signInWithKakao} className="bg-yellow-400 text-black px-6 py-2 rounded-md font-bold hover:bg-yellow-500">
      카카오 로그인
    </button>
  );
}