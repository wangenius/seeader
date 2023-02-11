import fs from "fs/promises";
import _ from "lodash";

export const json_read: Motion = (event, filePath) => {
  return require(filePath);
};
export const json_write: Motion = async (
  event,
  path,
  obj,
  partial: boolean
) => {
  try {
    const ori = partial ? require(path) : {};
    await fs.writeFile(path, JSON.stringify(_.defaultsDeep(obj, ori)));
  } catch {}
};
