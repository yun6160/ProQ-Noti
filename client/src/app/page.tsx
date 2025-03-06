'use client';

import { Layout } from '@/components/Layout';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return (
    <Layout>
      <Layout.Header title="소속 팀 선택" handleBack={() => router.back()} />
      <div className="flex flex-col items-center gap-5 bg-[#5CC3E8] pt-24 web:pt-60 px-10 h-screen">
        <div className="flex gap-5">
          <div className="flex flex-col justify-center items-center text-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white hover:bg-gray-200 cursor-pointer">
            <span>젠지</span>
            <span>이스포츠</span>
          </div>
          <div className="flex flex-col justify-center items-center text-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white hover:bg-gray-200 cursor-pointer">
            <span>한화생명</span>
            <span>이스포츠</span>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col justify-center items-center text-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white hover:bg-gray-200 cursor-pointer">
            <span>디플러스</span>
            <span>기아</span>
          </div>
          <div className="flex justify-center items-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white hover:bg-gray-200 cursor-pointer">
            <span>T1</span>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col justify-center items-center text-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white hover:bg-gray-200 cursor-pointer">
            <span>BNK</span>
            <span>피어엑스</span>
          </div>
          <div className="flex flex-col justify-center items-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white hover:bg-gray-200 cursor-pointer">
            <span>DRX</span>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col justify-center items-center text-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white hover:bg-gray-200 cursor-pointer">
            <span>OK저축은행</span>
            <span>브리온</span>
          </div>
          <div className="flex flex-col justify-center items-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white hover:bg-gray-200 cursor-pointer">
            <span>농심</span>
            <span>레드포스</span>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col justify-center items-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white hover:bg-gray-200 cursor-pointer">
            <span>DN</span>
            <span>프릭스</span>
          </div>
          <div className="flex flex-col justify-center items-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white hover:bg-gray-200 cursor-pointer">
            <span>KT</span>
            <span>롤스터</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
