import path from "path";
import _ from "lodash";

/** @Description  生成路径对象 */
export class Dest {
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

export abstract class Path {
  static parser(path: string) {
    const array = _.last(path.split(/\\/g)) || path;
    const name = array.slice(0, array.lastIndexOf("."));
    const ext = array.slice(array.lastIndexOf("."), array.length);
    return { array: array, name: name, ext: ext };
  }

  static join(path: string, ...props: string[]) {
    let res = path;

    props.map((item) => {
      res = res + `\\${item}`;
    });

    return res;
  }
}
