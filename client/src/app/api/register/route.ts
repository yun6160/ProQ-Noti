import { TABLES } from '@/constant/db';
import { supabase } from '@/utils/supabase/client';

/**
 * @description Save fcm token and device type to the database
 * @param userId
 * @param token
 * @param deviceType
 * @returns { status: 'success' | 'error', message?: string }
 */
export const POST = async (
  userId: string,
  token: string,
  deviceType: string
) => {
  const { data, error } = await supabase
    .from(TABLES.FCM_TOKENS)
    .insert({ user_id: userId, fcm_token: token, device_type: deviceType });

  if (error) {
    return { status: 'error', message: error?.message || 'FCM 토큰 저장 실패' };
  }
  return { status: 'success', message: 'FCM 토큰 저장 성공' };
};
