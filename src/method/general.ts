/** @Description 空白方法 */
export const voidFn = (...props: any): any => props;

/** @Description 抛出错误 */
export const err = (message: string = "未知错误") => {
  throw message;
};

