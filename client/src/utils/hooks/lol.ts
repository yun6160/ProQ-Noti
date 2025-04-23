export const spellIdToName: Record<number, string> = {
  1: 'SummonerBoost',
  3: 'SummonerExhaust',
  4: 'SummonerFlash',
  6: 'SummonerHaste',
  7: 'SummonerHeal',
  11: 'SummonerSmite',
  12: 'SummonerTeleport',
  13: 'SummonerMana',
  14: 'SummonerDot',
  21: 'SummonerBarrier',
  30: 'SummonerPoroRecall',
  31: 'SummonerPoroThrow',
  32: 'SummonerSnowball',
  39: 'SummonerSnowURFSnowball_Mark',
  2201: 'SummonerFlash',
  2202: 'SummonerTeleport'
};

export const getSpellName = (id: number): string | undefined => spellIdToName[id];

const perkIdToPath: Record<number, string> = {
  8005: 'perk-images/PerkStyle/Precision/PressTheAttack/PressTheAttack.png',
  9111: 'perk-images/PerkStyle/Precision/Overheal/Overheal.png',
  9103: 'perk-images/PerkStyle/Precision/LegendBloodline/LegendBloodline.png',
  8017: 'perk-images/PerkStyle/Inspiration/MagicalFootwear/MagicalFootwear.png',
  8345: 'perk-images/PerkStyle/Inspiration/BiscuitDelivery/BiscuitDelivery.png',
  8347: 'perk-images/PerkStyle/Inspiration/CosmicInsight/CosmicInsight.png',
  5005: 'perk-images/StatMods/StatModsAttackSpeedIcon.png',
  5008: 'perk-images/StatMods/StatModsAdaptiveForceIcon.png',
  5011: 'perk-images/StatMods/StatModsScalingHealthIcon.png'
};


export const getRunePath = (perkId: number): string =>
  perkIdToPath[perkId] || `perk-images/Perks/${perkId}.png`;
