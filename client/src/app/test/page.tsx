'use client'

import ChampionImage from '@/components/ChampionImage'
import RuneImages from '@/components/RuneImage'
import SpellImages from '@/components/SpellImages'

const championNames = ['266', '103', '84'];

const spellNames = [
  'summoner_flash',
  'summoner_haste',
  'summoner_heal',
  'summoner_smite',
  'summoner_teleport_new',
  'summonerbarrier',
  'summonerignite',
  'summonermana'
];

const runeIds = [
  8005, 8010, 8021, 8128, 8214, 8229, 8230, 8439, 8451, 8453
]

export default function TestPage() {
  const version = '14.8.1'

  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-2">Champions</h2>
        <div className="flex flex-wrap gap-2">
          {championNames.map((champ) => (
            <ChampionImage
              key={champ}
              championName={champ}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Spells</h2>
        <div className="flex flex-wrap gap-2">
        <SpellImages spellNames={spellNames.map(name => name.toLowerCase())} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Runes</h2>
        <div className="flex flex-wrap gap-2">
          <RuneImages runePaths={runeIds} />
        </div>
      </section>
    </div>
  )
}