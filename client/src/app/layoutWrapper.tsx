// LayoutWrapper.tsx (클라이언트 컴포넌트)
'use client';

import Dropdown from '@/components/dropdown';
import { usePathname } from 'next/navigation';

export default function LayoutWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const layoutClass =
    pathname === '/'
      ? 'bg-primary-white w-mobile screen:w-web h-full px-[2rem] py-[2rem] flex flex-col items-center'
      : 'bg-primary-mint w-mobile screen:w-web h-full px-[2rem] py-[2rem] flex flex-col items-center';

  return (
    <div className={layoutClass}>
      <Dropdown />
      {children}
    </div>
  );
}
