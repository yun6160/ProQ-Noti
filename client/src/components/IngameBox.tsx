'use client';

import { useState, MouseEvent, useEffect } from 'react';
import LiveIcon from '@/app/assets/icons/live.svg';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaHourglassStart } from 'react-icons/fa';
import type { IIngameBoxProps } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useUserId } from '@/utils/hooks/userAuth';
import { POST } from '@/app/api/subscribe/route';
import ChampionImage from './ChampionImage';
import SpellImages from './SpellImages';
import RuneImages from './RuneImage';
import { getChampionName, getRunePath, getSpellName } from '@/utils/hooks/lol';
import { formatGameLength } from '@/utils/hooks/formatGameLegnth';

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
  const [liveGame, setLiveGame] = useState<any>(null);
  const { toast } = useToast();
  const version = process.env.NEXT_PUBLIC_LEAGUE_PATCH || '15.8.1';
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

  const player = liveGame?.participants.find((p: any) => p.puuid === puuid);
  const championName = player ? getChampionName(player.championId) : undefined;
  const spellNames = player
    ? ([getSpellName(player.spell1Id), getSpellName(player.spell2Id)].filter(Boolean) as string[])
    : [];

  const runePaths = player?.perks?.perkIds
    ? player.perks.perkIds.slice(0, 2)
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
            <ChampionImage championName={championName} version={version} />
            <SpellImages spellNames={spellNames} version={version} />
            <RuneImages runePaths={runePaths} />
          </div>
          <div className="text-body2Bold">
            {summoner_name}
            {tag_line && `#${tag_line}`}
          </div>
          <div className="flex justify-between w-full text-body2">
            <div className="flex gap-1 items-center">
              <FaHourglassStart className="text-primary-mint" />
              {liveGame && formatGameLength(liveGame.gameLength)}
            </div>
            <div>큐 타입 {liveGame?.gameQueueConfigId}</div>
          </div>
        </div>
      )}
    </div>
  );
}
