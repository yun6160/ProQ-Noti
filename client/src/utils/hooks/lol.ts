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
  8008: 'perk-images/PerkStyle/Precision/LethalTempo/LethalTempoTemp.png',
  8021: 'perk-images/PerkStyle/Precision/FleetFootwork/FleetFootwork.png',
  8010: 'perk-images/PerkStyle/Precision/Conqueror/Conqueror.png',
  9111: 'perk-images/PerkStyle/Precision/Overheal/Overheal.png',
  9101: 'perk-images/PerkStyle/Precision/Triumph/Triumph.png',
  9103: 'perk-images/PerkStyle/Precision/LegendBloodline/LegendBloodline.png',
  9104: 'perk-images/PerkStyle/Precision/LegendAlacrity/LegendAlacrity.png',
  8014: 'perk-images/PerkStyle/Precision/CoupDeGrace/CoupDeGrace.png',
  8017: 'perk-images/PerkStyle/Inspiration/MagicalFootwear/MagicalFootwear.png',
  8345: 'perk-images/PerkStyle/Inspiration/BiscuitDelivery/BiscuitDelivery.png',
  8347: 'perk-images/PerkStyle/Inspiration/CosmicInsight/CosmicInsight.png',
  8128: 'perk-images/PerkStyle/Domination/DarkHarvest/DarkHarvest.png',
  8126: 'perk-images/PerkStyle/Domination/CheapShot/CheapShot.png',
  8138: 'perk-images/PerkStyle/Domination/EyeballCollection/EyeballCollection.png',
  8135: 'perk-images/PerkStyle/Domination/RavenousHunter/RavenousHunter.png',
  8214: 'perk-images/PerkStyle/Sorcery/SummonAery/SummonAery.png',
  8229: 'perk-images/PerkStyle/Sorcery/ArcaneComet/ArcaneComet.png',
  8230: 'perk-images/PerkStyle/Sorcery/PhaseRush/PhaseRush.png',
  5005: 'perk-images/StatMods/StatModsAttackSpeedIcon.png',
  5008: 'perk-images/StatMods/StatModsAdaptiveForceIcon.png',
  5011: 'perk-images/StatMods/StatModsScalingHealthIcon.png'
};


export const getRunePath = (perkId: number): string =>
  perkIdToPath[perkId] || `perk-images/Perks/${perkId}.png`;
