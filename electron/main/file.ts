import fs from "fs/promises";
import jschardet from "jschardet";
import iconvLite from "iconv-lite";
import _ from "lodash";
import { BrowserWindow, shell } from "electron";

export abstract class Fima {
  static async read(path: string) {
    try {
      await this.exist(path);
      const fileHandler = await fs.open(path, "r");
      const fileStats = await fs.stat(path);
      const fileContents = Buffer.alloc(fileStats.size);
      await fileHandler.read(fileContents, 0, fileContents.length);
      await fileHandler.close();
      const encoding = jschardet.detect(fileContents).encoding;
      if (encoding !== "UTF-8") return iconvLite.decode(fileContents, "gbk");
      return fileContents.toString();
    } catch (e) {
      throw e;
    }
  }

  static showItemInFolder(path: string) {
    BrowserWindow.getFocusedWindow().blur();
    shell.showItemInFolder(path);
  }

  static async copy(from: string, to: string) {
    await fs.copyFile(from, to);
  }

  static async exist(path: string) {
    await fs.access(path, fs.constants.F_OK);
  }

  static async isExist(path: string): Promise<boolean> {
    try {
      await fs.access(path, fs.constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }

  static remove(path: string) {
    return fs.rm(path);
  }

  static async write_str(path: string, content: string) {
    await fs.writeFile(path, content);
  }

  /** @Description 写入json文件
   * @param path {string} save path
   * @param obj {any} save target
   * @param partial {boolean} if true change the different item or cover the original file
   * */
  static async write_json(path, obj, partial: boolean = false) {
    await fs.writeFile(
      path,
      JSON.stringify(_.defaultsDeep(obj, partial ? require(path) : {}))
    );
  }
}
