import { Channels } from "local";
import { app } from "@/method/app";

/** @Description 返回导入文件 */
export const file = (path: string): any => window.file(path);

file.read = (path: string) => app(Channels.file_read, path);

/** @Description text保存文件保存 */
file.save = (path: string, content: string) =>
  app(Channels.file_write, path, content);

/** @Description 文件复制 */
file.copy = (from: string, to: string) => app(Channels.file_copy, from, to);

/** @Description 打开目录位置 */
file.openInFolder = (path: string) => window.shell.showItemInFolder(path);

file.json_read = <T extends object>(path: string): T => window.file(path);

/** @Description 保存json文件 */
file.json_save = (path: string, content: object, partial: boolean = true) =>
  app("json_save", path, content, partial);
