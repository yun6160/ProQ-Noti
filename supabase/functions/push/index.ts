import { createClient } from 'npm:@supabase/supabase-js@2'
import { JWT } from 'npm:google-auth-library@9'
import serviceAccount from '../service-account.json' with { type: 'json' }
import { supabase } from "../_shared/supabaseClient.ts";
import { TABLES } from "../_shared/constants.ts";

interface Notification {
  id: string
  user_id: string
  body: string
}

interface WebhookPayload {
  type: 'INSERT'
  table: string
  record: Notification
  schema: 'public'
}

Deno.serve(async (req) => {
  try {
    const payload: WebhookPayload = await req.json()

    const { data: tokenList } = await supabase
      .from(TABLES.FCM_TOKENS)
      .select('fcm_token')
      .eq('user_id', payload.record.user_id)

    if (!tokenList || tokenList.length === 0) {
      return new Response(JSON.stringify({ message: 'No FCM tokens' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const accessToken = await getAccessToken({
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    })

    const results = []

    for (const { fcm_token } of tokenList) {
      try {
        const res = await fetch(
          `https://fcm.googleapis.com/v1/projects/${serviceAccount.project_id}/messages:send`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              message: {
                token: fcm_token,
                notification: {
                  title: `ProQ-Noti`,
                  body: payload.record.body,
                },
              },
            }),
          }
        )
        const resData = await res.json()
        results.push({
          token: fcm_token,
          status: res.status,
          success: res.ok,
          response: resData,
        })
      } catch (err) {
        console.error(`FCM send failed for token: ${fcm_token}`, err)
        results.push({
          token: fcm_token,
          status: 0,
          success: false,
          error: err.message || err,
        })
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('❌ 서버 에러:', err)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})

const getAccessToken = ({
  clientEmail,
  privateKey,
}: {
  clientEmail: string
  privateKey: string
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const jwtClient = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
    })
    jwtClient.authorize((err, tokens) => {
      if (err) {
        reject(err)
        return
      }
      resolve(tokens!.access_token!)
    })
  })
}