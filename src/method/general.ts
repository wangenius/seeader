export const voidFn = (...props: any): any => props;
export const err = (message: string = "未知错误") => {
  throw message;
};
