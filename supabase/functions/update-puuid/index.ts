import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { supabase } from "../_shared/supabaseClient.ts";
import { TABLES } from "../_shared/constants.ts";
import { Player } from "../_shared/types.ts";

const RIOT_API_KEY = Deno.env.get("RIOT_API_KEY");

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

Deno.serve(async () => {
    const { data: players, error } = await supabase.from(TABLES.RIOT_ACCOUNTS).select("*").returns<Player[]>();

    if (error || !players) {
        console.error("❌ 선수 데이터 가져오기 실패:", error);
        return new Response("Failed to fetch players", { status: 500 });
    }

    let successCount = 0;
    let failCount = 0;

    for (const player of players) {
        const { id, summoner_name, tag_line, puuid } = player;
        const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summoner_name}/${tag_line}?api_key=${RIOT_API_KEY}`;

        await delay(150);

        try {
            const res = await fetch(url);
            if (!res.ok) {
                if (res.status === 403) {
                    console.error("❌ Riot API 키가 잘못되었습니다.");
                    return new Response(JSON.stringify({ error: "Riot API key unauthorized (403)" }), {
                        status: 403,
                        headers: { "Content-Type": "application/json" },
                    });
                }
                if (res.status === 401) {
                    console.error("❌ Riot API 키가 만료되었습니다.");
                    return new Response(JSON.stringify({ error: "Riot API key expired or unauthorized (401)" }), {
                        status: 401,
                        headers: { "Content-Type": "application/json" },
                    });
                }
            }

            const resData = await res.json();

            const { error: updateError } = await supabase
                .from(TABLES.RIOT_ACCOUNTS)
                .update({
                    puuid: resData.puuid,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", id);

            if (updateError) {
                failCount++;
                console.error(`❌ [${summoner_name}, ${id}] DB 업데이트 실패:`, updateError);
            } else {
                successCount++;
            }
        } catch (e) {
            failCount++;
            console.error(`🔥 [${summor_name}, ${id}] Riot API 호출 실패:`, e);
        }
    }

    console.log(`✅ 성공: ${successCount}건`);
    console.log(`❌ 실패: ${failCount}건`);

    return new Response(
        JSON.stringify({
            message: "Player puuid updated",
            success: successCount,
            failed: failCount,
            total: players.length,
        }),
        { headers: { "Content-Type": "application/json" } }
    );
});
