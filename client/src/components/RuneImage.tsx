'use client'

interface RuneImagesProps {
  runePaths: number[];
}

export default function RuneImages({ runePaths }: RuneImagesProps) {

  return (
    <div className="overflow-hidden h-full flex flex-col gap-1">
      {runePaths.map((perkId, i) => (
        <img
          key={i}
          className="object-contain h-1/2"
          src={`/perks/${perkId}.png`}
          alt={`rune-${i}`}
        />
      ))}
    </div>
  )
}