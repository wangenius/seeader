/** @Description 文件操作类 */
import {Channels} from "a_root";

export abstract class File {

  /** @Description path :文件路径  content：string*/
  static save = (path: string, content: string) =>
    window.invoke("file_write", path, content);

  /** @Description 读取文件 */
  static read = (path: string): Promise<string> =>
    window.invoke(Channels.file_read, path);

  /** @Description 拷贝文件 */
  static copy = (from: string, to: string) =>
    window.invoke(Channels.file_copy, from, to);

  /** @Description 拷贝且覆盖 */
  static copyForce = (src: string, dest: string) =>
    window.invoke("file_copy_force", src, dest);
}
