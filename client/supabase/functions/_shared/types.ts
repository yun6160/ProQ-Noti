// types.ts
export type Player = {
  id: number;
  is_online: boolean;
  last_seen: string | null;
  pro_name: string;
  puuid: string;
  summoner_name: string;
  tag_line: string;
  team_id: number | null;
};

export type Database = {
  players: Player[];
};
