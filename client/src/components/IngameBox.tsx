'use client';

import { useState, MouseEvent } from 'react';
import LiveIcon from '@/app/assets/icons/live.svg';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaHourglassStart } from 'react-icons/fa';
import { IngameBoxProps } from '@/types';

export default function IngameBox({
  name,
  isLive,
  isSubscribe: initialIsSubscribe,
  isOpen,
  onBoxClick
}: IngameBoxProps) {
  const [isSubscribe, setIsSubscribe] = useState<boolean>(initialIsSubscribe);

  const handleSubscribeClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsSubscribe(!isSubscribe);
  };

  return (
    <div className="flex flex-col gap-[0.875rem]">
      <div
        className="flex items-center justify-center px-7 py-3 gap-5 w-[21.875rem] h-[3.437rem] rounded-[10px] shadow-bottom bg-primary-white"
        onClick={onBoxClick}
      >
        <div className="w-[13.75rem] font-semibold">{name}</div>
        {isLive ? (
          <div>
            <LiveIcon />
          </div>
        ) : (
          <div className="w-[2.187rem]"></div>
        )}
        <button className="flex" onClick={handleSubscribeClick}>
          {isSubscribe ? (
            <FaHeart size={20} className="text-primary-coral" />
          ) : (
            <FaRegHeart size={20} />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-5 items-center justify-center px-7 py-3 w-[21.875rem] h-[9.25rem] rounded-[10px] shadow-bottom bg-primary-white animate-slideindown">
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
          {/* 녹화랑 큐 타입 */}
          <div className="flex justify-between w-full">
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
