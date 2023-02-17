import { createClient, FileStat } from "webdav";
import * as fs from "fs";
import { Path, Settings } from "local";
import { DIRS, FILE_PATHS } from "../@constant/path";
import { Fima } from "./file";
import { mass } from "../ipc";
import { currentWindow } from "../inter/app";

export abstract class Dav {
  /** @Description 默认导出 client 对象 和 client 参数 */
  static async client() {
    const settings: Settings = require(FILE_PATHS.config.settings);

    const client = createClient(settings.sync.webdav.server, {
      username: settings.sync.webdav.account,
      password: settings.sync.webdav.password,
    });
    if ((await client.exists(settings.sync.webdav.root)) === false)
      await client.createDirectory(settings.sync.webdav.root);
    return { attr: settings.sync.webdav, client: client };
  }

  /** @Description 获取webdav目录文件 */
  static async content(relative: string = "") {
    const { attr, client } = await Dav.client();
    return await client.getDirectoryContents(attr.root + relative);
  }

  /** @Description 上传文件 */
  static async uploadMulti(paths: string[]) {
    const { attr, client } = await Dav.client();
    paths.map((item) => {
      fs.createReadStream(item).pipe(
        client.createWriteStream(`${attr.root}/${Path.parser(item).name_ext}`)
      );
    });
  }

  /** @Description download */
  static async download(dir, file: FileStat): Reply {
    const { client } = await Dav.client();
    /** @Description 获取下载连接 */
    const url = client.getFileDownloadLink(file.filename);
    const fileName = decodeURIComponent(Path.parser(url).name_ext);
    /** @Description 设置下载地址 */
    const dest = dir || DIRS.DOWNLOAD.end(fileName);

    /** @Description 本地已存在 */
    if (
      (await Fima.isExist(dest)) &&
      (await fs.statSync(dest)).size === file.size
    )
      return mass("existed in local", 1, dest);

    return new Promise((resolve) => {
      /** @Description 本地不存在时 */
      currentWindow().webContents.downloadURL(url);
      currentWindow().webContents.session.once(
        "will-download",
        (event, item) => {
          item.setSavePath(dest);
          item.once("done", (event, state) => {
            if (state === "completed")
              resolve(mass("completed download", 1, dest));
          });
        }
      );
    });
  }
}
