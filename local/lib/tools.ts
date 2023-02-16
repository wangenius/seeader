import _ from "lodash";

export class Path {
    static parser = (path: string) => {
        const array = _.last(path.split(/[\\/]/g)) || path;
        const name = array.slice(0, array.lastIndexOf("."));
        const ext = array.slice(array.lastIndexOf(".") + 1, array.length);
        const name_ext = name + "." + ext
        return { array, name, ext ,name_ext};
    };

    static join = (path: string, ...props: string[]) => {
        let res = path;
        for (const item of props) res = res + `\\${item}`;
        return res;
    };
}
