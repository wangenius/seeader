import { Dest } from "a_root";

const root_packaged = __dirname.slice(0, __dirname.indexOf("resources") - 1);
const root_dev = __dirname.slice(0, __dirname.indexOf("end") - 1);
const Dir_default = __dirname;
/** @Description 运行环境 */
export const isPackaged = __filename.includes("app.asar");
/** @Description 项目根目录 */
export const Dir_root = new Dest(isPackaged ? root_packaged : root_dev);

/** @Description 资源文件地址
 *  包括 asar
 *  config
 *  data等等
 *
 * */
export const Dir_resources = Dir_root.enter("resources");

/** @Description 打包文件地址  含有build静态文件和end后端文件和node modules文件 */
export const Dir_asar = isPackaged ? Dir_resources.enter("app.asar") : Dir_root;

/** @Description 后端文件地址 */
export const Dir_end = Dir_root.enter(isPackaged ? "end" : "electron");
/** @Description 后端文件地址 */
export const Dir_module = Dir_asar.enter("node_modules").enter("a_root");
/** 静态文件目录*/
export const Dir_statics = Dir_asar.enter("build");
/** @Description 图标文件 */
export const Path_icon = Dir_statics.end("icon", "icon.png");

/** 数据库目录*/
export const Dir_Data = Dir_resources.enter("data");

export const Dirs = {
  Dir_root,
  Dir_statics,
  root_packaged,
  isPackaged,root_dev,Dir_end,Path_icon,
  Dir_asar,
  Dir_resources,
  Dir_Data,
  Dir_module,
  Dir_default,
};
