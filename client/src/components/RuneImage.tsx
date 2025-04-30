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
            // className="object-contain h-1/2"
            className="w-5 h-5"
            src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/${getRunePath(perkId)}.png`}
            alt={`rune-${perkId}`}
          />
        );
      })}
    </div>
  )
}