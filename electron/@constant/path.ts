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
/** @Description 当前文件目录 */
const Dir_default = __dirname;
/** @Description 打包环境返回true */
export const isPackaged = __filename.includes("app.asar");
/** @Description 项目根目录 */
export const Dir_root = new Dest(isPackaged ? root_packaged : root_dev);
/** @Description 资源文件地址
 *  包括 asar
 *  config
 *  data等等
 * */
export const Dir_resources = Dir_root.enter("resources");
/** @Description 打包文件地址
 * 含有build静态文件和
 * end后端文件和
 * node modules文件 */
export const Dir_asar = isPackaged ? Dir_resources.enter("app.asar") : Dir_root;
/** @Description 后端文件地址 */
export const Dir_end = Dir_asar.enter("end");
/** @Description node module local文件地址 */
export const Dir_local = Dir_asar.enter("node_modules").enter("local");
/** 静态文件目录*/
export const Dir_statics = Dir_asar.enter("build");
/** @Description config */
export const Dir_config = Dir_resources.enter("config");
/** 数据库目录*/
export const Dir_Data = Dir_resources.enter("data");
/** @Description settings 文件地址 */
export const path_config_settings = Dir_config.end("settings.json");
/** @Description 图标文件 */
export const path_icon = Dir_statics.end("icon", "icon.png");

export const Dirs = {
  Dir_root,
  Dir_statics,
  root_packaged,
  isPackaged,
  root_dev,
  Dir_end,
  path_icon,
  Dir_asar,
  Dir_resources,
  Dir_Data,
  Dir_module: Dir_local,
  Dir_default,
};
