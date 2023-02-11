import { AppConfig, Channels, Path } from "local";
import _ from "lodash";

export const invoke = window.invoke;
export const paths = {
  root: window.paths.Dir_resources.path,
  config: Path.join(window.paths.Dir_resources.path, "config"),
  settings: Path.join(window.paths.Dir_resources.path, "config", AppConfig.files.settings),
};

export const clipboard = () => window.clipboard.readText();
clipboard.copy = (text: string) => window.clipboard.writeText(text);


/** @Description browser */
export const browser = (url: string) => invoke(Channels.window_new, url);
browser.dict = (word: string) =>
  invoke(Channels.dict_search, _.lowerCase(word));
