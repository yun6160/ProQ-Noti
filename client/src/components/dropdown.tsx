import useOutsideClick from '@/utils/hooks/useOutsideClick';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { PiDotsThreeCircle } from 'react-icons/pi';

interface DropdownProps {
  isOpen?: boolean;
}

const Dropdown = ({ isOpen = false }: DropdownProps) => {
  const [open, setOpen] = useState(isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef as React.RefObject<HTMLElement>, () =>
    setOpen(false)
  );

  const handleLogout = () => {
    // logout logic
  };

  return (
    <div ref={dropdownRef} className="relative flex justify-end w-full">
      <button
        className="bg-none border-none cursor-pointer outline-none p-0"
        onClick={() => setOpen(!open)}
      >
        <PiDotsThreeCircle size={24} className="text-primary-navy" />
      </button>
      {open && (
        <div className="absolute top-6 right-0 bg-white shadow-md rounded z-50 border border-gray-300 text-sm text-black w-[5rem]">
          <ul className="list-none p-0 m-0">
            <li className="p-2 border-b border-gray-300 text-center hover:bg-gray-100 cursor-pointer">
              <Link href="/" className="block text-black no-underline">
                메인 화면
              </Link>
            </li>
            <li className="p-2 border-b border-gray-300 text-center hover:bg-gray-100 cursor-pointer">
              <Link href="/login" className="block text-black no-underline">
                로그인
              </Link>
            </li>
            <li className="p-2 text-center hover:bg-gray-100 cursor-pointer">
              <button
                onClick={handleLogout}
                className="block w-full text-black"
              >
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
