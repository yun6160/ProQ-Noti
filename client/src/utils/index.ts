import { isLoggedIn, rUserId } from '@/store/authSlice';
import { ISubscribeItem } from '@/types';
import { useSelector } from 'react-redux';

export function getUserId() {
  const userId = useSelector(rUserId);
  return userId;
}

export function getIsLoggedIn() {
  const isloggedIn = useSelector(isLoggedIn);
  return isloggedIn;
}

export const isSubscribed = (
  player: ISubscribeItem,
  userId: string
): boolean => {
  return player.subscribe?.some((s) => s.user_id === userId) ?? false;
};
