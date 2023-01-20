import { remote } from "./remote";
import __ from "lodash";


/** @Description 抽象类 */
export abstract class Browser {

  /** @Description 打开新窗口 url是http地址 */
  static create = (url: string) => {
    return remote("window_new", url);
  };
  /** @Description 打开文件位置 relative是相对静态资源public的相对位置*/
  static openFile = (relativePath: string) =>
    remote("shell_open", relativePath);

  /** @Description 本地词典查找 */
  static dict = (word: string) => remote("dict_search", __.lowerCase(word));
}
