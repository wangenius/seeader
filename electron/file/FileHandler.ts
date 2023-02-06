import fs from "fs/promises";
import jschardet from "jschardet";
import iconvLite from "iconv-lite";
import path from "path";
import { constants } from "fs";
import { app, shell } from "electron";
import { Dir_root } from "../@constant/path";
import { currentWindow } from "../window/Windows";

export function checkFileExist(path: string) {
  return fs.access(path, fs.constants.F_OK);
}

export async function isExist(path: string) {
  try {
    await fs.access(path, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export const file_write: ListenerFunc = (event, path, content) =>
  fs.writeFile(path, content);

export const file_read: ListenerFunc = async (event, path) => {
  try {
    await checkFileExist(path);
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
};

export const file_copy: ListenerFunc = async (event, src, dest) => {
  try {
    return (
      (await isExist(path.join(__dirname, "..", "..", "public", dest))) ||
      (await fs
        .copyFile(src, path.join(__dirname, "..", "..", "public", dest))
        .then((res) => path.join(__dirname, "..", "..", "public", dest)))
    );
  } catch {}
};

export const file_copy_force: ListenerFunc = async (event, src, dest) => {
  try {
    await fs
      .copyFile(
        src,
        path.join(__dirname, "..", "..", "public", dest),
        constants.COPYFILE_FICLONE
      )
      .then((res) => path.join(__dirname, "..", "..", "public", dest));
  } catch {}
};

export const shell_open: ListenerFunc = (event, filePath) => {
  return shell.openPath(Dir_root.end(filePath));
};
