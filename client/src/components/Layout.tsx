"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import ArrowBack from '@/app/assets/icons/arrowBack.svg';
import Menu from '@/app/assets/icons/Menu.svg';

interface HeaderProps {
  title?: string;
  handleBack?: () => void;
  children?: ReactNode;
  option?: ReactNode;
}

const Header = ({ title, handleBack, option, children }: HeaderProps) => {
  const router = useRouter();

  return (
    <header className="w-full h-[3.375rem] p-4 shadow-bottom">
      <div className="relative flex items-center justify-center w-full h-full">
        <button
          className="absolute left-0"
          aria-label="뒤로 가기"
          onClick={handleBack ?? (() => router.back())}
        >
          <ArrowBack alt="뒤로가기 아이콘" width={24} height={24} />
        </button>
        {children ? (
          children
        ) : (
          <>
            <h2 className="text-heading2">{title}</h2>
            {option}
          </>
        )}
        <button className="absolute right-0">
          <Menu alt="햄버거 아이콘" width={24} height={24} />
        </button>
      </div>
    </header>
  );
};

const Main = ({ children }: { children: ReactNode}) => {
  return (
    <main
      className="relative flex flex-col flex-grow w-full min-h-0 px-5 py-3 overflow-y-scroll"
    >
      {children}
    </main>
  );
};

const Footer = ({ children }: { children: ReactNode }) => {
  return (
    <footer className="w-full h-[5rem] min-h-[5rem] px-6 py-4 shadow-top">
      {children}
    </footer>   
  );
};

export const Layout = ({ children }: {children: ReactNode }) => {
  return (
    <div className="flex flex-col justify-center w-full h-full border-x border-gray-500">
      {children}
    </div>
  );
};

Layout.Header = Header;
Layout.Main = Main;
Layout.Footer = Footer;