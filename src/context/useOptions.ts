interface OptionsPairs {
  /*general*/
  closeWindow?: "tray" | "exit";
  language?: "en" | "cn";
  showTrayIcon?: boolean;
  trayIconPath?: string;
  content?: Style.SX;
  body: {};
}

export function useOptions(props: OptionsPairs) {}
