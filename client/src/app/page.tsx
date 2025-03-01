'use client';

import PushNotificationManager from './_notification/PushNotificationManager';
import InstallPrompt from './_notification/InstallPrompt';

export default function Page() {
  return (
    <div className="h-full">
      <div className="text-xl font-semibold mb-4">소속 팀 선택</div>
      <div className="flex flex-col items-center gap-5 bg-[#5CC3E8] p-10 h-screen">
        <div className="flex gap-5">
          <div className="flex flex-col justify-center items-center text-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white">
            <span>젠지</span>
            <span>이스포츠</span>
          </div>
          <div className="flex flex-col justify-center items-center text-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white">
            <span>한화생명</span>
            <span>이스포츠</span>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col justify-center items-center text-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white">
            <span>디플러스</span>
            <span>기아</span>
          </div>
          <div className="flex justify-center items-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white">
            <span>T1</span>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col justify-center items-center text-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white">
            <span>BNK</span>
            <span>피어엑스</span>
          </div>
          <div className="flex flex-col justify-center items-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white">
            <span>DRX</span>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col justify-center items-center text-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white">
            <span>OK저축은행</span>
            <span>브리온</span>
          </div>
          <div className="flex flex-col justify-center items-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white">
            <span>농심</span>
            <span>레드포스</span>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col justify-center items-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white">
            <span>DN</span>
            <span>프릭스</span>
          </div>
          <div className="flex flex-col justify-center items-center w-[6.25rem] h-[6.25rem] rounded-xl shadow-bottom bg-white">
            <span>KT</span>
            <span>롤스터</span>
          </div>
        </div>
      </div>
    </div>
  );
}
