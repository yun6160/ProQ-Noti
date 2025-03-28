{
  /* 선수 정보 & 인게임 정보 */
}
export interface ISubscribeItem extends gammerInfo {
  isLive: boolean;
  isSubscribe: boolean;
}

export interface IIngameBoxProps extends ISubscribeItem {
  isOpen: boolean;
  onBoxClick: () => void;
}

export interface gammerInfo {
  created_at?: string | null;
  id: number;
  pro_name: string;
  puuid: string;
  summoner_name: string;
  tag_line: string;
  team_id?: number | null;
}
