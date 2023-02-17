import * as fs from "fs";
import archiver from "archiver";
import Adm_zip from "adm-zip";
import {DIRS} from "../@constant/path";
import {db} from "../main/data";
import _ from "lodash";
import {App} from "./app";
import {mass} from "../ipc";
import {Detector} from "../main/generator";

/** @Description shelf */
export abstract class Shelf {
  /** @Description export shelf */
  static async export():Reply {
    const filePath = await App.save("export", "shelf");
    if (Detector.ud(filePath)) return mass.cancel();
    const output = fs.createWriteStream(filePath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.directory(DIRS.DATA.path, false);
    archive.file(DIRS.DATA.end("shelf.db"), { name: "index.db" });

    return new Promise((res) => {
      output.on("close", () => {
        res(mass("导出成功"));
      });
      archive.on("warning", (err) => {
        res(mass.cancel(err));
      });
      archive.on("error", (err) => {
        res(mass.cancel(err));
      });
      archive.pipe(output);
      archive.finalize();
    });
  }

  /** @Description import */
  static async import():Reply {
    const path = await App.open("shelf", ["shelf"]);
    if (Detector.ud(path)) return mass.cancel();

    let unzip = new Adm_zip(path);
    unzip.extractAllTo(DIRS.DATA.path, false);
    let stderr = fs.createWriteStream(DIRS.RESOURCES.end("temp.log"), {
      flags: "w",
      encoding: "utf-8",
    });
    let logger = new console.Console(stderr);

    const temp = await db.select("index");
    const existed = await db.select("shelf", {}, { path: 1, _id: 1 });
    let body = {
      success: 0,
      fail: 0,
      total: temp.length,
    };
    for await (const item of temp) {
      if (_.findIndex(existed, { _id: item._id }) !== -1) {
        body.fail++;
        logger.log(
          ` Can't insert key ${item._id}, it violates the unique constraint`
        );
      } else {
        await db.insert("shelf", item);
        body.success++;
      }
    }
    fs.rmSync(DIRS.DATA.end("index.db"));
    return mass("导入文件", body.fail ? 0 : body.success ? 1 : -1, body);
  }
}
