import fs from "fs/promises";
import jschardet from "jschardet";
import iconvLite from "iconv-lite";
import _ from "lodash";
import { BrowserWindow, shell } from "electron";
import path from "path";

/** @Description file manager */
export abstract class Fima {
  /** @Description read */
  static async read(path: string) {
      await Fima.exist(path);
      const fileHandler = await fs.open(path, "r");
      const fileStats = await fs.stat(path);
      const fileContents = Buffer.alloc(fileStats.size);
      await fileHandler.read(fileContents, 0, fileContents.length);
      await fileHandler.close();
      const encoding = jschardet.detect(fileContents).encoding;
      if (encoding !== "UTF-8") return iconvLite.decode(fileContents, "gbk");
      return fileContents.toString();
  }

  /** @Description show */
  static showItemInFolder(path: string) {
    BrowserWindow.getFocusedWindow().blur();
    shell.showItemInFolder(path);
  }
  /** @Description file copy */
  static async copy(from: string, to: string) {
    await fs.copyFile(from, to);
  }
  /** @Description file exist or not */
  static exist(path: string) {
    return fs.access(path, fs.constants.F_OK);
  }

  /** @Description file exist or not */
  static async isExist(path: string): Promise<boolean> {
    try {
      await fs.access(path, fs.constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }

  /** @Description 如果有该文件夹，不抛出错误 否则递归创建文件夹 */
  static async mkdir(dir: string) {
    try {
      await Fima.exist(dir);
    } catch {
      await fs.mkdir(dir, { recursive: true });
    }
  }

  /** @Description remove file */
  static remove(path: string) {
    return fs.rm(path);
  }

  /** @Description write file auto mkdir recursively */
  static async write(filepath: string, content: string, force: boolean = false) {
    await Fima.mkdir(path.dirname(filepath));
    if (!force && (await Fima.isExist(filepath))) return "file exist";
    await fs.writeFile(filepath, content);
  }


  /** @Description 写入json文件
   * @param path {string} save path
   * @param obj {any} save target
   * @param partial {boolean} if true change the different item or cover the original file
   * @param force {boolean} if true it works when the file is existed, default is true
   * */
  static async write_json(path, obj, force = true, partial = false) {
    await Fima.write(
      path,
      JSON.stringify(_.defaultsDeep(obj, partial ? require(path) : {})),
      force
    );
  }
}
