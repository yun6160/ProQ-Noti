'use client';

import { useState, MouseEvent, useEffect } from 'react';
import LiveIcon from '@/app/assets/icons/live.svg';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaHourglassStart } from 'react-icons/fa';
import type { IIngameBoxProps, LiveGameData, LiveGameParticipant } from '@/types';
import { useToast } from '@/hooks/useToast';
import { useUserId } from '@/hooks/userAuth';
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
  const [liveGame, setLiveGame] = useState<LiveGameData | null>(null);
  const { toast } = useToast();
  const userId = useUserId();

  useEffect(() => {
    if (!puuid || !isOpen || hasFetched) return;
    fetch(`/api/live-game?summonerId=${puuid}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        if (json.inGame) {
          setLiveGame(json.game);
        } else {
          setLiveGame(null);
        }
        setHasFetched(true);
      });
  }, [puuid, isOpen, hasFetched]);

  useEffect(() => {
    if (!isOpen) {
      setHasFetched(false);
    }
  }, [isOpen]);

  const player = liveGame?.participants.find((p: LiveGameParticipant) => p.puuid === puuid);
  const championId = player ? player.championId : null;
  const spellIds = player
  ? ([player.spell1Id, player.spell2Id])
  : [];

  const runePaths = player?.perks
  ? [player.perks.perkStyle, player.perks.perkSubStyle]
  : [];
    
  const handleSubscribeClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (loggedIn) {
      const result = await POST(userId!, Number(id));
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
      {isOpen && player && (
        <div className="flex flex-col gap-1 items-center justify-center px-7 py-3 w-[20.69rem] web:w-[30rem] h-[9.25rem] rounded-[10px] shadow-bottom bg-primary-white animate-slideindown">
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
                  {Math.floor((Date.now() / 1000 - liveGame.gameStartTime) / 60)}분 전 시작
                </div>
              )}
            </div>
            <div>
              {`큐 타입: ${gameModeMap[liveGame?.gameMode as keyof typeof gameModeMap || ""]}`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
