import path from "path";

/** @Description  生成路径对象 */
class Path {
  path: string;

  [props: string]: any;

  constructor(path: string) {
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

export { Path };
