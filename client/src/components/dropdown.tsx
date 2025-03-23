import { storeLogout } from '@/store/authSlice';
import useOutsideClick from '@/utils/hooks/useOutsideClick';
import { signOut } from '@/utils/supabase/actions';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch } from 'react-redux';

interface DropdownProps {
  isOpen?: boolean;
}

const Dropdown = ({ isOpen = false }: DropdownProps) => {
  const [open, setOpen] = useState(isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useOutsideClick(dropdownRef as React.RefObject<HTMLElement>, () =>
    setOpen(false)
  );

  const handleLogout = () => {
    signOut();
    dispatch(storeLogout());
  };

  return (
    <div ref={dropdownRef} className="absolute right-1 flex items-center">
      <button
        className="bg-none border-none cursor-pointer outline-none p-0"
        onClick={() => setOpen(!open)}
      >
        <GiHamburgerMenu size={25} className="text-primary-navy" />
      </button>
      {open && (
        <div className="absolute top-8 right-0 bg-white shadow-md rounded z-50 border border-gray-300 text-sm text-black w-[5rem]">
          <ul className="list-none p-0 m-0">
            <li className="border-b border-gray-300 text-center hover:bg-gray-100 cursor-pointer">
              <Link href="/" className="block p-2 text-black no-underline">
                메인 화면
              </Link>
            </li>
            <li className="border-b border-gray-300 text-center hover:bg-gray-100 cursor-pointer">
              <Link href="/login" className="block p-2 text-black no-underline">
                로그인
              </Link>
            </li>
            <li className="text-center hover:bg-gray-100 cursor-pointer">
              <button
                onClick={handleLogout}
                className="block p-2 w-full text-black"
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
