import { isLoggedIn, rUserId } from '@/store/authSlice';
import { useSelector } from 'react-redux';

export function useUserId() {
  return useSelector(rUserId);
}

export function useIsLoggedIn() {
  return useSelector(isLoggedIn);
}
