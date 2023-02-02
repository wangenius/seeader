/** @Description 定义基本方法 */
declare type Fn = (...props: any) => any;


/** @Description language */
declare type Language = "zh" | "en";


/** @Description 设置 */
declare interface Settings {
  _id?: string;
  /** @Description 常规设置 */
  common: {
    startWithWin?: boolean;
    minWithTray?: boolean;
  };
  /** @Description 外观 */
  preference: {
    theme?: 'default'| "dark";
    language?: Language;
  };
  /** @Description 阅读 */
  reading: {
    contentOpen?: boolean;
    fontSize?: number;
    fontFamily?: string;
    lineHeight?: number;
    paragraphSpacing?: number;
    dictionary?: "online" | "local";
  };
}
