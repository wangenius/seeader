/** @Description  生成路径对象 */
export declare class Dest {
    path: string;
    [props: string]: any;
    constructor(path: string);
    exit(): Dest;
    enter(...props: string[]): Dest;
    end(...props: string[]): string;
}
export declare abstract class Path {
    static parser(path: string): {
        array: string;
        name: string;
        ext: string;
    };
    static join(path: string, ...props: string[]): string;
}
