'use client';

import { useState, MouseEvent } from 'react';
import LiveIcon from '@/app/assets/icons/live.svg';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaHourglassStart } from 'react-icons/fa';
import type { IIngameBoxProps } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function IngameBox({
  pro_name,
  summoner_name,
  tag_line,
  is_online,
  isSubscribe: initialIsSubscribe,
  isOpen,
  onBoxClick,
  loggedIn
}: IIngameBoxProps) {
  const [isSubscribe, setIsSubscribe] = useState<boolean>(
    initialIsSubscribe ?? false
  );
  const { toast } = useToast();

  const handleSubscribeClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (loggedIn) {
      setIsSubscribe(!isSubscribe);
    } else {
      toast({ description: '로그인 후 구독버튼을 눌러주세요!' });
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
          {/* 챔피언, 스펠 2개, 룬 2개 */}
          <div className="flex gap-2 w-full h-full overflow-hidden items-center justify-center ">
            <img
              className="h-full object-contain"
              src="https://ddragon.leagueoflegends.com/cdn/15.4.1/img/champion/Aatrox.png"
            ></img>
            <div className="overflow-hidden h-full flex flex-col gap-1">
              <img
                className="object-contain h-1/2"
                src="https://ddragon.leagueoflegends.com/cdn/15.4.1/img/spell/SummonerFlash.png"
              ></img>
              <img
                className="object-contain h-1/2"
                src="https://ddragon.leagueoflegends.com/cdn/15.4.1/img/spell/SummonerFlash.png"
              ></img>
            </div>
            <div className="overflow-hidden h-full flex flex-col gap-1">
              <img
                className="object-contain h-1/2"
                src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png"
              ></img>
              <img
                className="object-contain h-1/2"
                src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png"
              ></img>
            </div>
          </div>
          <div className="text-body2Bold">
            {summoner_name}
            {tag_line && `#${tag_line}`}
          </div>
          {/* 녹화랑 큐 타입 */}
          <div className="flex justify-between w-full text-body2">
            <div className="flex gap-1 items-center">
              <FaHourglassStart className="text-primary-mint" />
              시간
            </div>
            <div>큐 타입</div>
          </div>
        </div>
      )}
    </div>
  );
}
