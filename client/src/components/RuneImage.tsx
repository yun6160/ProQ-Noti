'use client'

import { getRunePath } from "@/utils/hooks/lol";

interface RuneImagesProps {
  runePaths: number[];
}

export default function RuneImages({ runePaths }: RuneImagesProps) {

  return (
    <div className="overflow-hidden h-full flex flex-col gap-1">
      {runePaths.map((perkId, i) => {
        
        return (
          <img
            key={i}
            className="object-contain h-1/2"
            src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/${getRunePath(perkId)}.png`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `/perks/${perkId}.png`;
            }}
            alt={`rune-${perkId}`}
          />
        );
      })}
    </div>
  )
}