import _ from "lodash";

/** @Description 默认返回 */
export const path = () => window.paths;
path.join = (path: string, ...props: string[]) => {
  let res = path;
  for (const item of props) res = res + `\\${item}`;
  return res;
};

path.parser = (path: string) => {
  const array = _.last(path.split(/\\/g)) || path;
  const name = array.slice(0, array.lastIndexOf("."));
  const ext = array.slice(array.lastIndexOf("."), array.length);
  return { array: array, name: name, ext: ext };
};

path.sub = {
  constant: path().Dir_constant.path,
  settings: path.join(path().Dir_resources.path, "config", "settings.json"),
  config: path.join(path().Dir_resources.path, "config", "app.json"),
};
