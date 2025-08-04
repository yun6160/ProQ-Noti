import { createClient } from '@supabase/supabase-js';
import { createClientForServer } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClientForServer();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: '인증 실패' }, { status: 401 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const { data: deleteResult, error: deleteError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', user.id)
      .select();

    if (deleteError) {
      return NextResponse.json(
        { error: `삭제 실패: ${deleteError.message}` },
        { status: 500 }
      );
    }

    const { error: subscriptionError } = await supabaseAdmin
      .from('subscriptions')
      .delete()
      .eq('user_id', user.id);

    if (subscriptionError) {
      return NextResponse.json(
        { error: `구독 정보 삭제 실패: ${subscriptionError.message}` },
        { status: 500 }
      );
    }

    const { error: authDeleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);

    if (authDeleteError) {
      return NextResponse.json(
        { error: `Auth 삭제 실패: ${authDeleteError.message}` },
        { status: 500 }
      );
    }

    await supabase.auth.signOut();

    return NextResponse.json({
      message: '회원탈퇴가 완료되었습니다.',
      deletedData: deleteResult
    });

  } catch (error) {
    return NextResponse.json(
      { error: `처리 중 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}` },
      { status: 500 }
    );
  }
}