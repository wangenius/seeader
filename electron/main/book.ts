import { Dastore } from "./data";
import fs from "fs/promises";
import { Dir_Data, Dir_resources } from "../@constant/path";
import { config, Path } from "local";
import { FileStat } from "webdav";
import { currentWindow } from "./app";
import { Generator } from "./generator";
import { Fima } from "./file";
import { Dav } from "./webdav";

export abstract class Book {
  static async add(path: string) {
    const res = await Dastore.select("shelf", { path: path });
    if (res.length)
      return { code: 0, msg: `已经添加过该书籍《${Path.parser(path).name}》` };
    const { Chapters, total, titles } = await Generator.Book(path);
    const book = {
      name: Path.parser(path).name,
      path: path,
      total: total,
      progress: 0,
      titles: titles,
    };
    /** @Description 书籍信息插入书架 */
    const { _id } = await Dastore.insert("shelf", book);
    /** @Description 书籍db名是书架_id */
    return { code: 1, msg: await Dastore.insert(_id, Chapters) };
  }

  static upload(paths: string[]) {
    return Dav.upload(paths);
  }

  static async backup(dir: string, books: any[]) {
    let body = {
      success: 0,
      fail: 0,
      total: books.length,
    };
    books.map(item=>{
      Fima.copy(item.path,Path.join(dir,Path.parser(item.path).name_ext))
      body.success++
    })
    return {code:1,msg:"备份成功",body:body}
  }

  /** @Description 返回下载路径位置 */
  static async download(file: FileStat, dir?: string) {
    const { client } = await Dav.client();

    /** @Description 获取下载连接 */
    const url = client.getFileDownloadLink(file.filename);
    const fileName = decodeURIComponent(Path.parser(url).name_ext);
    /** @Description 设置下载地址 */
    const dest = dir || Dir_resources.enter("download").end(fileName);

    /** @Description 本地已存在 */
    if ((await Fima.isExist(dest)) && (await fs.stat(dest)).size === file.size)
      return { code: 1, filepath: dest };

    /** @Description 本地不存在时 */
    currentWindow().webContents.downloadURL(url);
    return new Promise((resolve) => {
      currentWindow().webContents.session.once(
        "will-download",
        (event, item) => {
          item.setSavePath(dest);
          item.once("done", (event, state) => {
            if (state === "completed") resolve({ code: 1, filepath: dest });
          });
        }
      );
    });
  }

  static async delete(id: string) {
    await Dastore.delete("shelf", { _id: id });
    return await Fima.remove(Dir_Data.end(id + config.extension.database));
  }
}
