import * as fs from "fs";
import archiver from "archiver";
import Adm_zip from "adm-zip";
import { Dir_Data, Dir_resources } from "../@constant/path";
import { Dastore } from "./data";
import _ from "lodash";

export abstract class Shelf {
  static export(path: string) {
    const output = fs.createWriteStream(path);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.directory(Dir_resources.end("data"), false);
    archive.file(Dir_resources.enter("data").end("shelf.db"), {
      name: "index.db",
    });

    output.on("close", function () {
      console.log(archive.pointer() + " total bytes");
      console.log(
        "archiver has been finalized and the output file descriptor has closed."
      );
    });

    archive.on("warning", function (err) {
      throw err;
    });

    archive.on("error", function (err) {
      throw err;
    });

    archive.pipe(output);
    archive.finalize();
    return {
      code: 1,
      msg: "archiver has been finalized and the output file descriptor has closed.",
    };
  }

  static async import(path: string) {
    let unzip = new Adm_zip(path);

    unzip.extractAllTo(Dir_resources.end("data"), false);

    let stderr = fs.createWriteStream(Dir_resources.end("temp.log"), {
      flags: "w",
      encoding: "utf-8",
    });
    let logger = new console.Console(stderr);

    const temp = await Dastore.select("index", {});
    const existed = await Dastore.select("shelf", {}, { path: 1, _id: 1 });
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
        await Dastore.insert("shelf", item);
        body.success++;
      }
    }
    fs.rmSync(Dir_Data.end("index.db"));
    return { code: body.fail ? 0 : 1, body: body };
  }
}
