import { createClient } from "webdav";
import * as fs from "fs";
import { Path, Settings } from "local";
import { Dir_resources } from "../@constant/path";

export abstract class Dav {
  /** @Description 默认导出 client 对象 和 client 参数 */
  static async client() {
    const a: Settings = require(Dir_resources.end("config", "settings.json"));
    const client = createClient(a.sync.webdav.server, {
      username: a.sync.webdav.account,
      password: a.sync.webdav.password,
    });
    if ((await client.exists(a.sync.webdav.root)) === false)
      await client.createDirectory(a.sync.webdav.root);
    return { attr: a.sync.webdav, client: client };
  }

  static async content(relative: string = "") {
    const { attr, client } = await Dav.client();
    return await client.getDirectoryContents(attr.root + relative);
  }

  static async upload(paths: string[]): ReturnV {
    const { attr, client } = await Dav.client();
    paths.map((item) => {
      fs.createReadStream(item).pipe(
        client.createWriteStream(`${attr.root}/${Path.parser(item).name_ext}`)
      );
    });
    return { code: 1, msg: "上传成功" };
  }
}
