'use client';

import { useState, MouseEvent, useEffect } from 'react';
import LiveIcon from '@/app/assets/icons/live.svg';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaHourglassStart } from 'react-icons/fa';
import { getToken } from 'firebase/messaging';
import { getFirebaseMessaging } from '@/lib/firebase';
import type {
  IIngameBoxProps,
  LiveGameData,
  LiveGameParticipant
} from '@/types';
import { useToast } from '@/hooks/useToast';
import { useUserId } from '@/hooks/useAuth';
import { POST } from '@/app/api/subscribe/route';
import ChampionImage from './ChampionImage';
import SpellImages from './SpellImages';
import RuneImages from './RuneImages';
import { gameModeMap } from '@/hooks/lol';

export default function IngameBox({
  pro_name,
  summoner_name,
  tag_line,
  is_online,
  is_subscribed: initialIsSubscribe,
  isOpen,
  onBoxClick,
  loggedIn,
  puuid,
  id
}: IIngameBoxProps) {
  const [isSubscribe, setIsSubscribe] = useState<boolean>(
    initialIsSubscribe ?? false
  );
  const [hasFetched, setHasFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [liveGame, setLiveGame] = useState<LiveGameData | null>(null);
  const { toast } = useToast();
  const userId = useUserId();
  const messaging = getFirebaseMessaging();

  useEffect(() => {
    if (!puuid || !isOpen || hasFetched) return;
    if (isOpen && puuid) setLoading(true);
    fetch(`/api/live-game?summonerId=${puuid}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        if (json.inGame) {
          setLiveGame(json.game);
        } else {
          setLiveGame(null);
        }
      })
      .catch((error) => {
        setLiveGame(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [puuid, isOpen, hasFetched]);

  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
      setHasFetched(false);
    }
  }, [isOpen]);

  const player = liveGame?.participants.find(
    (p: LiveGameParticipant) => p.puuid === puuid
  );
  const championId = player ? player.championId : null;
  const spellIds = player ? [player.spell1Id, player.spell2Id] : [];

  const runePaths = player?.perks
    ? [player.perks.perkStyle, player.perks.perkSubStyle]
    : [];

  const handleSubscribeClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (loggedIn) {
      const permission = Notification.permission;
      if ('Notification' in window && permission !== 'granted') {
        Notification.requestPermission();
      }

      if (permission === 'denied') {
        toast({
          description: '알림 권한을 허용해주세요!'
        });
        return;
      }

      if (messaging) {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
        });
        const result = await POST(userId!, token, Number(id));
      }

      setIsSubscribe(!isSubscribe);
    } else {
      toast({ description: '로그인 후 구독 버튼을 눌러주세요!' });
    }
  };

  return (
    <div className="flex flex-col gap-[0.875rem]">
      <div
        className="flex items-center justify-center px-7 py-3 gap-5 w-[20.69rem] web:w-[30rem] h-[3.437rem] rounded-[10px] shadow-bottom bg-primary-white cursor-pointer"
        onClick={onBoxClick}
      >
        <div className="w-[13.75rem] font-semibold">{pro_name}</div>
        {is_online ? (
          <div className="animate-pulse">
            <LiveIcon />
          </div>
        ) : (
          <div className="w-[2.187rem]"></div>
        )}
        <button className="flex" onClick={handleSubscribeClick}>
          {isSubscribe ? (
            <FaHeart size={20} className="text-primary-coral animate-like" />
          ) : (
            <FaRegHeart size={20} />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-1 items-center justify-center px-7 py-3 w-[20.69rem] web:w-[30rem] h-[9.25rem] rounded-[10px] shadow-bottom bg-primary-white animate-slideindown">
          {loading ? (
            // 1. 로딩 중일 때는 스피너를 표시
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-mint"></div>
          ) : player ? (
            // 2. 로딩이 끝났고, player 데이터가 있으면 게임 정보를 표시
            <>
              <div className="flex gap-2 w-full h-full overflow-hidden items-center justify-center">
                <ChampionImage championId={championId} />
                <SpellImages spellIds={spellIds} />
                <RuneImages runePaths={runePaths} />
              </div>
              <div className="text-body2Bold">
                {summoner_name}
                {tag_line && `#${tag_line}`}
              </div>
              <div className="flex justify-between w-full text-body2">
                <div className="flex gap-1 items-center">
                  <FaHourglassStart className="text-primary-mint" />
                  {liveGame && (
                    <div>
                      {Math.floor(
                        (Date.now() - liveGame.gameStartTime) / 60000
                      )}
                      분 전 시작
                    </div>
                  )}
                </div>
                <div>
                  {`큐 타입: ${gameModeMap[(liveGame?.gameMode as keyof typeof gameModeMap) || '']}`}
                </div>
              </div>
            </>
          ) : (
            // 3. 로딩이 끝났는데, player 데이터가 없으면 '게임 중 아님' 메시지를 표시
            <span className="text-xl">현재 게임중이 아닙니다.</span>
          )}
        </div>
      )}
    </div>
  );
}
