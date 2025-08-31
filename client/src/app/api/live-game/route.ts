import { NextResponse } from 'next/server';

const RIOT_API_KEY = process.env.NEXT_PUBLIC_RIOT_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const puuid = searchParams.get('summonerId');

  if (!puuid) {
    return NextResponse.json({ error: 'puuid 파라미터가 없습니다.' }, { status: 400 });
  }

  if (!RIOT_API_KEY) {
    console.error('RIOT_API_KEY가 설정되지 않았습니다.');
    return NextResponse.json({ error: '서버 설정 오류입니다.' }, { status: 500 });
  }

  try {
    const summonerRes = await fetch(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      {
        headers: {
          'X-Riot-Token': RIOT_API_KEY,
        },
        next: { revalidate: 300 },
      }
    );

    if (!summonerRes.ok) {
      if (summonerRes.status === 401) {
        return NextResponse.json({ error: 'API 키가 유효하지 않습니다.' }, { status: 401 });
      }
      if (summonerRes.status === 404) {
        return NextResponse.json({ inGame: false });
      }
      if (summonerRes.status === 429) {
        return NextResponse.json({ error: 'API 요청 한도를 초과했습니다.' }, { status: 429 });
      }
      if (summonerRes.status === 403) {
        return NextResponse.json({ error: 'API 접근이 금지되었습니다.' }, { status: 403 });
      }

      return NextResponse.json({ error: '게임 정보를 가져올 수 없습니다.' }, { status: summonerRes.status });
    }

    const summonerData = await summonerRes.json();
    const encryptedSummonerId = summonerData.id;

    const liveGameRes = await fetch(
      `https://kr.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${encryptedSummonerId}`,
      {
        headers: {
          'X-Riot-Token': RIOT_API_KEY,
        },
        next: { revalidate: 0 },
      }
    );

    if (liveGameRes.status === 404) {
      return NextResponse.json({ inGame: false });
    }

    if (!liveGameRes.ok) {
      console.error(`Live Game API 오류: ${liveGameRes.status} ${liveGameRes.statusText}`);
      
      if (liveGameRes.status === 401) {
        return NextResponse.json({ error: 'API 키가 유효하지 않습니다.' }, { status: 401 });
      }
      if (liveGameRes.status === 429) {
        return NextResponse.json({ error: 'API 요청 한도를 초과했습니다.' }, { status: 429 });
      }
      if (liveGameRes.status === 403) {
        return NextResponse.json({ error: 'API 접근이 금지되었습니다.' }, { status: 403 });
      }
      
      return NextResponse.json({ 
        error: '게임 정보를 가져올 수 없습니다.',
        details: `HTTP ${liveGameRes.status}: ${liveGameRes.statusText}`
      }, { status: liveGameRes.status });
    }

    const gameData = await liveGameRes.json();

    return NextResponse.json({ 
      inGame: true, 
      game: gameData 
    });
  } catch (err) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
