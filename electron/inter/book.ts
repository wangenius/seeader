import {db} from "../main/data";
import {config, Path} from "local";
import {FileStat} from "webdav";
import {App} from "./app";
import {Detector, Generator} from "../main/generator";
import {Fima} from "../main/file";
import {Dav} from "../main/webdav";
import {DIRS} from "../@constant/path";
import {mass} from "../ipc";

/** @Description book handle */
export abstract class Book {
  /** @Description 有参数时 添加参数路径，无参数时打开选择参数 */
  static async add(path: string | undefined): Reply {
    const targetPath = path || (await App.open("txt", ["txt", "epub"]));
    if (Detector.ud(targetPath)) return mass.cancel();
    /** @Description 检查是否有相同path的文件，如果有 throw false */
    const res = await db.select("shelf", { path: targetPath });
    /** @Description 长度 */
    if (res.length)
      return mass.cancel(`书籍《${Path.parser(targetPath).name}》已在书架上`);
    const { Chapters, total, titles } = await Generator.Book(targetPath);
    /** @Description 书籍信息插入书架 */
    const { _id } = await db.insert("shelf", {
      name: Path.parser(targetPath).name,
      path: targetPath,
      total: total,
      progress: 0,
      titles: titles,
    });
    await db.insert(_id, Chapters);
    /** @Description 书籍db名是书架_id */
    return mass("添加成功");
  }

  /** @Description upload */
  static async upload(paths: string[]): Reply {
    let msg = `确定上传选中书籍:\n${paths.map((item) => item + "\n")}`;
    const code = await App.confirm(msg);
    if (Detector.ud(code)) return mass.cancel();
    await Dav.uploadMulti(paths);
    return mass("上传成功");
  }

  /** @Description backup */
  static async backup(books: any[]): Reply {
    const dirPath = await App.directory();
    if (Detector.ud(dirPath)) return mass.cancel();
    let body = { success: 0, fail: 0, total: books.length };
    books.map((item) => {
      Fima.copy(item.path, Path.join(dirPath, Path.parser(item.path).name_ext));
      body.success++;
    });
    return mass("备份成功", 1, body);
  }

  /** @Description 返回下载路径位置 */
  static async download(file: FileStat, dir?: string): Reply {
    return Dav.download(dir, file);
  }

  /** @Description delete */
  static async delete(id: string): Reply {
    await db.delete("shelf", { _id: id });
    await Fima.remove(DIRS.DATA.end(id + config.extension.database));
    return mass("删除成功");
  }
}
