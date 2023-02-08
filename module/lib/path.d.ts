/** @Description  生成路径对象 */
declare class Path {
    path: string;
    [props: string]: any;
    constructor(path: string);
    exit(): Path;
    enter(...props: string[]): Path;
    end(...props: string[]): string;
}
export { Path };
