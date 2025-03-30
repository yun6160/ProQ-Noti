{
  /* 선수 정보 & 인게임 정보 */
}
export interface ISubscribeItem extends gammerInfo {
  isSubscribe: boolean;
}

export interface IIngameBoxProps extends ISubscribeItem {
  isOpen: boolean;
  onBoxClick: () => void;
  loggedIn: boolean;
}

export interface gammerInfo {
  created_at?: string | null;
  id: number;
  pro_name: string;
  puuid: string;
  summoner_name: string;
  tag_line: string;
  team_id?: number | null;
  is_oline: boolean;
  last_seen?: string | null;
}
