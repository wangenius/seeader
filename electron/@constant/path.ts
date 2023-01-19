import path from "path";
import { app } from "electron";

const root_packaged = __dirname.slice(0, __dirname.indexOf("resources") - 1);
const root_dev = __dirname.slice(0, __dirname.indexOf("end") - 1);

class Path {
  path: string;
  [props: string]: any;
  constructor(path) {
    this.path = path;
  }

  exit(): Path {
    return new Path(this.path.slice(0, this.path.lastIndexOf("\\")));
  }

  enter(...props: string[]): Path {
    return new Path(path.join(this.path, ...props));
  }

  end(...props: string[]): string {
    return path.join(this.path, ...props);
  }
}

/** @Description 项目根目录 */
export const Dir_root = new Path(app.isPackaged ? root_packaged : root_dev);
/** @Description 资源文件 含有build静态文件和end后端文件和node modules文件 */
export const Dir_asar = app.isPackaged
  ? Dir_root.enter("resources").enter("app.asar")
  : Dir_root;
/** 静态文件目录*/
export const Dir_statics = Dir_asar.enter("build");
/** 数据库目录*/
export const Dir_dataStores = Dir_root.enter("resources").enter("data");
