import Mdict from "js-mdict";
import { Dir_statics } from "../@constant/path";

/** @Description 词典搜索 */
export const dict_search: Motion = (event, target: string) => {
  const dict = new Mdict(Dir_statics.enter("mdx").end("zh.mdx"));
  return dict.lookup(target);
};
