import { remote } from "./remote";
import __ from "lodash";

export abstract class Browser {
  static create = (url: string) => {
    return remote("window_new", url);
  };
  static openFile = (relativePath: string) =>
    remote("shell_open", relativePath);

  static dict = (word: string) => remote("dict_search", __.lowerCase(word));
}
