import { createClient } from "npm:@supabase/supabase-js@2";
import { JWT } from "npm:google-auth-library@9";
import { TABLES } from "../_shared/constants.ts";

interface Notification {
    id: string;
    user_id: string;
    body: string;
}

interface WebhookPayload {
    type: "INSERT";
    table: string;
    record: Notification;
    schema: "public";
}

const getAccessToken = async (clientEmail: string, privateKey: string): Promise<string> => {
    const jwtClient = new JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
    });
    const tokens = await jwtClient.getAccessToken();
    if (!tokens.token) {
        throw new Error("Failed to retrieve access token.");
    }
    return tokens.token;
};

Deno.serve(async (req) => {
    try {
        // 1. 환경 변수 로드 및 검증
        const clientEmail = Deno.env.get("SERVICE_ACCOUNT_CLIENT_EMAIL");
        let privateKey = Deno.env.get("SERVICE_ACCOUNT_PRIVATE_KEY");
        const projectId = Deno.env.get("FIREBASE_PROJECT_ID");

        if (!clientEmail || !privateKey || !projectId) {
            console.error("Missing critical environment variables.");
            return new Response(JSON.stringify({ error: "Server configuration error" }), { status: 500 });
        }
        privateKey = privateKey.replace(/\\n/g, "\n");

        // 2. 페이로드 파싱
        const payload: WebhookPayload = await req.json();

        // 3. 관리자용 Supabase 클라이언트 생성
        const supabaseAdmin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

        // 4. DB에서 FCM 토큰 조회
        const { data: tokenList } = await supabaseAdmin
            .from(TABLES.FCM_TOKENS)
            .select("fcm_token")
            .eq("user_id", payload.record.user_id);

        if (!tokenList || tokenList.length === 0) {
            return new Response(JSON.stringify({ message: "No FCM tokens found for user." }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        // 5. Google 인증 토큰 발급
        const accessToken = await getAccessToken(clientEmail, privateKey);

        // 6. Promise.all을 사용해 모든 알림을 동시에 병렬로 전송 (성능 개선)
        const promises = tokenList.map(({ fcm_token }) => {
            const fcmBody = {
                message: {
                    token: fcm_token,
                    data: {
                        title: `ProQ-Noti`,
                        body: payload.record.body,
                    },
                },
            };

            return fetch(`https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(fcmBody),
            })
                .then((res) =>
                    res.json().then((resData) => ({
                        token: fcm_token,
                        status: res.status,
                        success: res.ok,
                        response: resData,
                    }))
                )
                .catch((err) => {
                    console.error(`FCM send failed for token: ${fcm_token}`, err);
                    return {
                        token: fcm_token,
                        status: 0,
                        success: false,
                        error: err.message || err,
                    };
                });
        });

        const results = await Promise.all(promises);
        console.log("FCM Send Results:", results);

        // 6. 발송에 실패한 토큰들만 걸러내기
        const invalidTokens = results.filter((result) => !result.success).map((result) => result.token);

        if (invalidTokens.length > 0) {
            console.log(`Found ${invalidTokens.length} invalid tokens. Deleting from database...`);

            // 7. 실패한 토큰들을 DB에서 한 번에 삭제
            const { error: deleteError } = await supabaseAdmin
                .from(TABLES.FCM_TOKENS)
                .delete()
                .in("fcm_token", invalidTokens);

            if (deleteError) {
                console.error("Error deleting invalid tokens:", deleteError);
            } else {
                console.log("Successfully deleted invalid tokens.");
            }
        }

        // 7. 최종 결과 반환
        return new Response(JSON.stringify({ success: true, results }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("❌ Top-level server error:", err);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
});
