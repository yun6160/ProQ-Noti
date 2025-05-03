export interface LiveGameParticipant {
  puuid: string;
  summonerName: string;
  championId: number;
  spell1Id: number;
  spell2Id: number;
  perks: {
    perkIds: number[];
  };
}

export interface LiveGameData {
  gameMode: string;
  gameStartTime: number;
  gameLength: number;
  participants: LiveGameParticipant[];
}