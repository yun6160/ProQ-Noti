import { TABLES } from '@/constant/db';
import { supabase } from '@/utils/supabase/client';

/**
 * @description Save or update FCM token and device type to the database.
 * If a record with the same user_id and device_type exists, update it with the new token,
 * even if the token value is the same (to handle potential "bad token" re-registration).
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
    const { data: existingRecord, error: selectError } = await supabase
      .from(TABLES.FCM_TOKENS)
      .select('id, fcm_token')
      .eq('user_id', userId)
      .eq('device_type', deviceType)
      .maybeSingle();

    if (selectError) {
      console.error('FCM 토큰 조회 중 오류 발생:', selectError);
      return {
        status: 'error',
        message: selectError?.message || 'FCM 토큰 조회 실패'
      };
    }

    let operationResult;
    let successMessage: string;

    if (existingRecord) {
      // 2. 레코드가 이미 존재하면 무조건 업데이트 시도
      // 기존 토큰과 새 토큰이 같더라도 업데이트를 시도하여
      // 불량 토큰 재설정을 강제함. (updated_at 갱신 효과도 있음)
      console.log(
        `FCM 토큰 업데이트 시도: userId=${userId}, deviceType=${deviceType}`
      );
      operationResult = await supabase
        .from(TABLES.FCM_TOKENS)
        .update({ fcm_token: token, updated_at: new Date().toISOString() }) // updated_at도 함께 업데이트
        .eq('id', existingRecord.id);
      successMessage = 'FCM 토큰을 업데이트 했습니다.';
    } else {
      // 3. 레코드가 없으면 새로 인서트
      console.log(
        `새로운 FCM 토큰 삽입 시도: userId=${userId}, deviceType=${deviceType}`
      );
      operationResult = await supabase
        .from(TABLES.FCM_TOKENS)
        .insert({ user_id: userId, fcm_token: token, device_type: deviceType });
      successMessage = 'FCM 토큰을 저장했습니다.';
    }

    if (operationResult.error) {
      console.error('FCM 토큰 저장/업데이트 실패:', operationResult.error);
      return {
        status: 'error',
        message: operationResult.error?.message || 'FCM 토큰 저장/업데이트 실패'
      };
    }

    console.log(successMessage);
    return { status: 'success', message: successMessage };
  } catch (err) {
    console.error('❌ FCM 토큰 POST 함수 내부 오류:', err);
    return {
      status: 'error',
      message: (err as Error).message || '알 수 없는 서버 오류'
    };
  }
};
