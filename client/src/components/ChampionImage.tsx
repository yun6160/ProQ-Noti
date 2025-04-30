'use client'

interface ChampionImageProps {
  championName: string | undefined;
}

export default function ChampionImage({ championName }: ChampionImageProps) {
  return (
    <img
      // className="object-contain h-full"
      className="w-5 h-5"
      src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championName}.png`}
      alt={championName}
    />
  );
}