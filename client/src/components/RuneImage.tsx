'use client'

import { useEffect, useState } from "react";

interface RuneImagesProps {
  runePaths: number[];
}

export default function RuneImages({ runePaths }: RuneImagesProps) {
  const [perkData, setPerkData] = useState<Record<number, string>>({});

  useEffect(() => {
    fetch('/data/perks.json')
      .then((res) => res.json())
      .then((data) => {
        const perkMap: Record<number, string> = {};
        data.forEach((perk: any) => {
          perkMap[perk.id] = perk.iconPath;
        });
        setPerkData(perkMap);
      })
      .catch((err) => console.error('Failed to fetch perks.json', err));
  }, []);

  const getPrimaryImageSrc = (perkId: number) => `/perks/${perkId}.png`;
  const getFallbackImageSrc = (perkId: number) => 
    perkData[perkId]
      ? `https://raw.communitydragon.org/latest${perkData[perkId]}`
      : '/perks/default.png';

  return (
    <div className="overflow-hidden h-full flex flex-col gap-1">
      {runePaths.map((perkId, i) => (
        <img
          key={i}
          className="object-contain h-1/2"
          src={getPrimaryImageSrc(perkId)}
          onError={(e) => {
            const fallbackSrc = getFallbackImageSrc(perkId);
            (e.target as HTMLImageElement).src = fallbackSrc;
          }}
          alt={`rune-${i}`}
        />
      ))}
    </div>
  )
}