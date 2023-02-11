import _ from "lodash";
import {Channels} from "a_root";
import {invoke} from "@/method/invoke";

/** @Description 读取绝对路径下的json文件 返回对象 */
export const json = <T extends object>(path: string):T => window.file(path);

/** @Description text转json 如果是T 则返回 parser后的对象,否则返回undefined */
json.parser = <T extends object>(
  text: string,
  reference?: T
): T | undefined => {
  const res = JSON.parse(text);
  for (const item of _.keys(reference)) if (!(item in res)) return;
  return res;
};

/** @Description 保存json文件 */
json.save = (path: string, content: object, partial: boolean = true) =>
  invoke(Channels.json_write, path, content, partial);
