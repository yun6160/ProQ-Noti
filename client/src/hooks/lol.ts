const spellIdToFileName: Record<number, string> = {
  1: 'summoner_boost',
  3: 'summoner_exhaust',
  4: 'summoner_flash',
  6: 'summoner_haste',
  7: 'summoner_heal',
  11: 'summoner_smite',
  12: 'summoner_teleport_new',
  13: 'summonermana',
  14: 'summonerignite',
  21: 'summonerbarrier'
};

export const getSpellName = (id: number): string | undefined => spellIdToFileName[id];

// Only including Precision and Inspiration trees and their common runes (used in ranked games)
const perkIdToPath: Record<number, string> = {
  8000: 'styles/precision/precision',
  8005: 'styles/precision/presstheattack/presstheattack',
  8008: 'styles/precision/lethaltempo/lethaltempotemp',
  8021: 'styles/precision/fleetfootwork/fleetfootwork',
  8010: 'styles/precision/conqueror/conqueror',
  9111: 'styles/precision/overheal/overheal',
  9101: 'styles/precision/triumph/triumph',
  9103: 'styles/precision/legendbloodline/legendbloodline',
  9104: 'styles/precision/legendalacrity/legendalacrity',
  8014: 'styles/precision/coupdegrace/coupdegrace',
  8017: 'styles/inspiration/magicalfootwear/magicalfootwear', // This rune is from Inspiration but often used in Precision+Inspiration combo
  8345: 'styles/inspiration/biscuitdelivery/biscuitdelivery',
  8347: 'styles/inspiration/cosmicinsight/cosmicinsight',

  8300: 'styles/inspiration/inspiration',
  8302: 'styles/inspiration/unsealedspellbook/unsealedspellbook',
  8303: 'styles/inspiration/firststrike/firststrike',
  8313: 'styles/inspiration/hextechflashtraption/hextechflashtraption',
  8316: 'styles/inspiration/miniondematerializer/miniondematerializer',
  8321: 'styles/inspiration/futuresmarket/futuresmarket',
  8326: 'styles/inspiration/timewarptonic/timewarptonic',
};

export const getRunePath = (perkId: number): string =>
  (perkIdToPath[perkId]?.toLowerCase()) || `perk-images/perks/${perkId}.png`;

export const gameModeMap = {
  CLASSIC: "솔로랭크",
  CHERRY: "아레나",
  ARAM: "칼바람",
  URF: "우르프"
};