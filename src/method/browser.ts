import {remote} from "./remote";
import _ from "lodash";
import {Channels} from "a_root";

/** @Description 抽象类 */
export abstract class Browser {
  /** @Description 打开新窗口 url是http地址 */
  static create = (url: string) => remote(Channels.window_new, url);
  /** @Description 打开文件位置 relative是相对静态资源public的相对位置*/
  static openFile = (relativePath: string) =>
    remote(Channels.shell_open, relativePath);
  /** @Description 本地词典查找 */
  static dict = (word: string) => remote(Channels.dict_search, _.lowerCase(word));
}
