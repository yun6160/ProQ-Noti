import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { supabase } from "../_shared/supabaseClient.ts";
import { TABLES } from "../_shared/constants.ts";
import { Player } from "../_shared/types.ts";

const RIOT_API_KEY = Deno.env.get("RIOT_API_KEY");

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

Deno.serve(async (req) => {
    const { data: players, error } = await supabase
        .from(TABLES.RIOT_ACCOUNTS)
        .select("*")
        .order("updated_at", { ascending: true })
        .returns<Player[]>();

    if (error || !players) {
        console.error("❌ 선수 데이터 가져오기 실패:", error);
        return new Response("Failed to fetch players", { status: 500 });
    }

    for (const player of players) {
        const { id, summoner_name, tag_line, puuid } = player;
        const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}?api_key=${RIOT_API_KEY}`;

        await delay(500);

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
                if (res.status === 400) {
                    console.error("❌ Riot API 키가 만료되었습니다.");
                    return new Response(JSON.stringify({ error: "Riot API key expired or unauthorized (401)" }), {
                        status: 400,
                        headers: { "Content-Type": "application/json" },
                    });
                }
                if (res.status === 429) {
                    console.error("❌ Riot API 호출 제한 초과 (429). 잠시 후 다시 시도하세요.");
                    return new Response(JSON.stringify({ error: "Riot API rate limit exceeded (429)" }), {
                        status: 429,
                        headers: { "Content-Type": "application/json" },
                    });
                }
            }

            const json = await res.json();
            const { gameName, tagLine } = json;

            if (gameName !== summoner_name || tagLine !== tag_line) {
                const { error: updateError } = await supabase
                    .from(TABLES.RIOT_ACCOUNTS)
                    .update({
                        summoner_name: gameName,
                        tag_line: tagLine,
                        updated_at: new Date().toISOString(),
                    })
                    .eq("id", id);

                if (updateError) {
                    console.error(`❌ [${summoner_name}, ${id}] DB 업데이트 실패:`, updateError);
                }
                console.log(`✅ [${summoner_name}#${tag_line}] 닉네임 업데이트: ${gameName}#${tagLine}`);
            }
        } catch (e) {
            console.error(`🔥 [${summoner_name}] Riot API 호출 실패:`, e);
        }
    }

    return new Response(
        JSON.stringify({
            message: "Player nickname updated successfully",
            total: players.length,
        }),
        { headers: { "Content-Type": "application/json" } }
    );
});
