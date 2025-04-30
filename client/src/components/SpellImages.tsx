'use client'

interface SpellImagesProps {
  spellNames: string[]
}

export default function SpellImages({ spellNames }: SpellImagesProps) {
  return (
    <div className="overflow-hidden h-full flex flex-col gap-1">
      {spellNames.map((spell, i) => (
        <img
          key={`${spell}-${i}`}
          // className="object-contain h-1/2"
          className="w-5 h-5"
          src={`https://raw.communitydragon.org/latest/game/data/spells/icons2d/${spell.toLowerCase()}.png`}
          alt={spell}
        />
      ))}
    </div>
  )
}
