/** @Description 定义基本方法 */
declare type Fn = (...props: any) => any;


/** @Description language */
declare type Language = string | "zh" | "en";


/** @Description 设置 */
declare interface Settings {
  _id?: string;
  /** @Description 常规设置 */
  common: {
    minWithTray?: boolean;
  };
  /** @Description 外观 */
  preference: {
    theme?: string | 'default'| "dark";
    language?: Language;
  };
  /** @Description 阅读 */
  reading: {
    chapterDocker?: boolean;
    fontSize?: number;
    fontFamily?: string;
    lineHeight?: number;
    paragraphSpacing?: number;
    dictionary?: string | "online" | "local";
  };
}