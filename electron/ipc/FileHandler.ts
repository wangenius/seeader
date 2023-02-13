import fs from "fs/promises";
import jschardet from "jschardet";
import iconvLite from "iconv-lite";
import { shell } from "electron";
import { Dir_root } from "../@constant/path";

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

export const file_write: Motion = (event, path, content) =>
  fs.writeFile(path, content);

export const file_read: Motion = async (event, path) => {
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

export const file_copy: Motion = async (event, src, dest) => {
  const is = await isExist(dest);
  console.log(is);
  if (is) return false;
  await fs.copyFile(src, dest);
  return dest;
};

export const shell_open: Motion = (event, filePath) => {
  return shell.openPath(Dir_root.end(filePath));
};
