{
  /* 선수 정보 & 인게임 정보 */
}
export interface ISubscribeItem {
  name: string;
  isLive: boolean;
  isSubscribe: boolean;
}

export interface IIngameBoxProps extends ISubscribeItem {
  isOpen: boolean;
  onBoxClick: () => void;
  loggedIn: boolean;
}
