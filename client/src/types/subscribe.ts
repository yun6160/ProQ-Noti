{
  /* 선수 정보 & 인게임 정보 */
}
export interface ISubscribeItem extends gamerInfo {
  subscribe?: {
    user_id: string;
  }[];
  isSubscribed?: boolean;
}

export interface IIngameBoxProps extends ISubscribeItem {
  isOpen: boolean;
  onBoxClick: () => void;
  loggedIn: boolean;
}

export interface gamerInfo {
  created_at?: string | null;
  id: number;
  pro_name: string;
  puuid: string;
  summoner_name: string;
  tag_line: string;
  team_id?: number | null;
  is_online: boolean;
  last_online?: string | null;
}
