'use client';

import { useRef, useState } from 'react';
import useOutsideClick from '@/utils/hooks/useOutsideClick';
import IngameBox from '@/components/IngameBox';
import type { ISubscribeItem } from '@/types';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '@/store/authSlice';

export default function SubscribeList({ list }: { list: ISubscribeItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loggedIn = useSelector(isLoggedIn);

  const handleBoxClick = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSetOpenIndex = () => {
    setOpenIndex(null);
  };

  useOutsideClick(
    containerRef as React.RefObject<HTMLElement>,
    handleSetOpenIndex
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-5 items-center justify-center w-full h-full"
    >
      {list.map((item, index) => (
        <IngameBox
          key={index}
          name={item.name}
          isLive={item.isLive}
          isSubscribe={item.isSubscribe}
          isOpen={openIndex === index}
          onBoxClick={() => handleBoxClick(index)}
          loggedIn={loggedIn}
        />
      ))}
    </div>
  );
}
