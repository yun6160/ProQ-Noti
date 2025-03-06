'use client';

import { Layout } from '@/components/Layout';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const teams = [
    ['젠지', '이스포츠'],
    ['한화생명', '이스포츠'],
    ['디플러스', '기아'],
    ['T1'],
    ['BNK', '피어엑스'],
    ['DRX'],
    ['OK저축은행', '브리온'],
    ['농심', '레드포스'],
    ['DN', '프릭스'],
    ['KT', '롤스터']
  ];

  return (
    <Layout>
      <Layout.Header title="소속 팀 선택" handleBack={() => router.back()} />
      <div className="flex flex-col items-center gap-5 bg-[#5CC3E8] pt-24 web:pt-60 px-10 h-full overflow-auto">
        {/* 2행 5열 고정, 여백 균등 적용 */}
        <div className="grid grid-rows-5 grid-cols-2 gap-5 screen:gap-10 w-full max-w-[22rem] h-full">
          {teams.map(([line1, line2], index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center text-center aspect-square bg-white hover:bg-gray-200 cursor-pointer rounded-xl shadow-bottom"
            >
              <span className="font-semibold text-md screen:text-xl">
                {line1}
              </span>
              {line2 && (
                <span className="font-semibold text-md screen:text-xl">
                  {line2}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
