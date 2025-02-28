{
  /* 선수 정보 & 인게임 정보 */
}
export interface SubscribeItem {
  name: string;
  isLive: boolean;
  isSubscribe: boolean;
}

export interface IngameBoxProps extends SubscribeItem {
  isOpen: boolean;
  onBoxClick: () => void;
}
