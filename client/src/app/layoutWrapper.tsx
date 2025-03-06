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
      ? 'flex flex-col bg-primary-white w-full min-w-[21.875rem] max-w-[46.785rem] h-auto shadow-lg rounded-lg'
      : 'flex flex-col bg-primary-mint w-full min-w-[21.875rem] max-w-[46.785rem] h-auto shadow-lg rounded-lg';

  return (
    <div className={layoutClass}>
      <Dropdown />
      {children}
    </div>
  );
}
