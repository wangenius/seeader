import path from "path";

/** @Description  生成路径对象 */
class Dest {
  path: string;

  [props: string]: any;

  constructor(path: string) {
    this.path = path;
  }

  exit(): Dest {
    return new Dest(this.path.slice(0, this.path.lastIndexOf("\\")));
  }

  enter(...props: string[]): Dest {
    return new Dest(path.join(this.path, ...props));
  }

  end(...props: string[]): string {
    return path.join(this.path, ...props);
  }
}

/** @Description 打包时 win-unpacked 文件位置 */
const root_packaged = __dirname.slice(0, __dirname.indexOf("resources") - 1);
/** @Description 开发环境下时开发项目根目录 */
const root_dev = __dirname.slice(0, __dirname.indexOf("end") - 1);
/** @Description 打包环境返回true */
const isPackaged = __filename.includes("app.asar");
/** @Description 项目根目录 */
const ROOT = new Dest(isPackaged ? root_packaged : root_dev);
/** @Description 资源文件地址
 *  包括 asar
 *  config
 *  data等等
 * */
const RESOURCES = ROOT.enter("resources");
/** @Description 打包文件地址
 * 含有build静态文件和
 * end后端文件和
 * node modules文件 */
const ASAR = isPackaged ? RESOURCES.enter("app.asar") : ROOT;
/** @Description 后端文件地址 */
const END = ASAR.enter("end");
/** @Description node module local文件地址 */
const LOCAL = ASAR.enter("node_modules").enter("local");
/** 静态文件目录*/
const STATICS = ASAR.enter("build");
/** @Description config */
const CONFIG = RESOURCES.enter("config");
/** 数据库目录*/
const DATA = RESOURCES.enter("data");
/** @Description 下载目录 */
const DOWNLOAD = RESOURCES.enter("download");

/** @Description kinds of params */
export const PARAMS = {
  isPackaged,
};

/** @Description 具体路径 */
export const FILE_PATHS = {
  preload: END.end("preload.js"),
  icon: STATICS.end("icon", "icon.png"),
  indexHTML: STATICS.end("index.html"),
  config: {
    settings: CONFIG.end("settings.json"),
  },
};
/** @Description directory paths */
export const DIRS = {
  ROOT,
  RESOURCES,DOWNLOAD,
  ASAR,
  END,
  STATICS,
  CONFIG,
  DATA,
  LOCAL,
};

/** @Description integration path */
export const PATHS = {
  ...PARAMS,
  ...DIRS,
  ...FILE_PATHS,
};
