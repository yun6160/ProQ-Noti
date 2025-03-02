// LayoutWrapper.tsx (클라이언트 컴포넌트)
'use client';

import { usePathname } from 'next/navigation';

export default function LayoutWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const layoutClass =
    pathname === '/'
      ? 'flex flex-col bg-primary-white w-[24rem] md:w-mobile h-auto min-h-[30rem] shadow-lg rounded-lg'
      : 'flex flex-col bg-primary-mint w-[24rem] md:w-mobile h-auto min-h-[30rem] shadow-lg rounded-lg';

  return <div className={layoutClass}>{children}</div>;
}
