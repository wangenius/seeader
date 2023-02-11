export * from "./json";
export * from "./invoke";
export * from "./data";
export * from "./dialog";
export * from "./file";

/** @Description 空白方法 */
export const fn = (...props: any): any => props;
/** @Description 抛出错误 */
export const err = (message: string = "未知错误") => {
  throw message;
};
