import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { supabase } from '../_shared/supabaseClient.ts';
import { TABLES } from '../_shared/constants.ts';

Deno.serve(async () => {
  const { data: players, error } = await supabase
    .from(TABLES.RIOT_PRO_USERS)
    .select('*');

  if (error) {
    console.error('Error fetching players:', error);
    return new Response('Failed to fetch players', { status: 500 });
  }

  console.log('✅ [update-players] players fetched:', players.length);

  return new Response(
    JSON.stringify({ message: 'Fetched players', count: players.length }),
    { headers: { 'Content-Type': 'application/json' } }
  );
});
