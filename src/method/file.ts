import { Channels } from "a_root";
import { invoke } from "@/method/invoke";

/** @Description 返回导入文件 */
export const file = (path: string): any => window.file(path);

/** @Description text保存文件保存 */
file.save = (path: string, content: string) =>
  invoke(Channels.file_write, path, content);

/** @Description 文件复制 */
file.copy = (from: string, to: string) => invoke(Channels.file_copy, from, to);

/** @Description 打开目录位置 */
file.openInFolder = (path: string) => window.shell.showItemInFolder(path);
