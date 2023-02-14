import fs from "fs/promises";
import { shell } from "electron";
import { Dir_root } from "../@constant/path";
import { file } from "../method/file";

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
