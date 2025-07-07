import { TABLES } from '@/constant/db';
import { supabase } from '@/utils/supabase/client';

/**
 * @description Save or update FCM token and device type to the database.
 * If a record with the same user_id and device_type exists, update it.
 * Otherwise, insert a new record.
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
  try {
    // 1. 해당 user_id와 device_type을 가진 레코드가 있는지 조회
    const { data: existingRecord, error: selectError } = await supabase
      .from(TABLES.FCM_TOKENS)
      .select('id, fcm_token') // 업데이트를 위해 id와 fcm_token만 가져옴
      .eq('user_id', userId)
      .eq('device_type', deviceType)
      .maybeSingle();

    if (selectError) {
      // 여전히 다른 에러가 발생할 수는 있음 (네트워크 등)
      console.error('FCM 토큰 조회 중 오류 발생:', selectError);
      return {
        status: 'error',
        message: selectError?.message || 'FCM 토큰 조회 실패'
      };
    }

    let operationResult;

    if (existingRecord) {
      // 2. 레코드가 이미 존재하면 업데이트
      operationResult = await supabase
        .from(TABLES.FCM_TOKENS)
        .update({ fcm_token: token, updated_at: new Date().toISOString() }) // updated_at도 함께 업데이트
        .eq('id', existingRecord.id); // id로 특정 레코드 업데이트
      return { status: 'success', message: 'FCM 토큰을 업데이트 했습니다' };
    } else {
      // 3. 레코드가 없으면 새로 인서트
      operationResult = await supabase
        .from(TABLES.FCM_TOKENS)
        .insert({ user_id: userId, fcm_token: token, device_type: deviceType });
    }

    // 4. 최종 결과 확인
    if (operationResult.error) {
      console.error('FCM 토큰 저장/업데이트 실패:', operationResult.error);
      return {
        status: 'error',
        message: operationResult.error?.message || 'FCM 토큰 저장/업데이트 실패'
      };
    }

    console.log('FCM 토큰 저장/업데이트 성공.');
    return { status: 'success', message: 'FCM 토큰 저장/업데이트 성공' };
  } catch (err) {
    console.error('❌ FCM 토큰 POST 함수 내부 오류:', err);
    return {
      status: 'error',
      message: (err as Error).message || '알 수 없는 서버 오류'
    };
  }
};
