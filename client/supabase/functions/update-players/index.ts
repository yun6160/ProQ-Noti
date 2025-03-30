import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { supabase } from '../_shared/supabaseClient.ts';
import { TABLES } from '../_shared/constants.ts';
import { Player } from '../_shared/types.ts';

const RIOT_API_KEY = Deno.env.get('RIOT_API_KEY');

Deno.serve(async () => {
  const { data: players, error } = await supabase
    .from(TABLES.RIOT_PRO_USERS)
    .select('*')
    .returns<Player[]>();

  if (error) {
    console.error('Error fetching players:', error);
    return new Response('Failed to fetch players', { status: 500 });
  }

  let successCount = 0;
  let failCount = 0;

  const updates = await Promise.all(
    players.map(async (player: Player) => {
      const { id, pro_name, puuid } = player;
      const url = `https://kr.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${puuid}?api_key=${RIOT_API_KEY}`;

      try {
        const res = await fetch(url);
        const is_online = res.status === 200;
        const last_online = is_online
          ? new Date().toISOString()
          : player.last_online;

        // DB 업데이트
        const { error: updateError } = await supabase
          .from(TABLES.RIOT_PRO_USERS)
          .update({ is_online, last_online })
          .eq('id', id);

        if (updateError) {
          failCount++;
          console.error(`❌ [${pro_name}] DB 업데이트 실패:`, updateError);
        } else {
          successCount++;
        }
      } catch (e) {
        failCount++;
        console.error(`🔥 [${pro_name}] Riot API 호출 실패:`, e);
      }
    })
  );

  console.log(`✅ 성공: ${successCount}건`);
  console.log(`❌ 실패: ${failCount}건`);

  return new Response(
    JSON.stringify({
      message: 'Player statuses updated',
      total: players.length,
      success: successCount,
      failed: failCount
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
});
