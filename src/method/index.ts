import { toast } from "react-toastify";

export const toa =
  (fn: Fn, suc: string = "执行成功", fail: string = "执行失败") =>
  (...props: any) => {
    try {
      fn(...props);
      toast.success(suc);
    } catch {
      toast.error(fail);
    }
  };
/** @Description 空白方法 */
export const fn = (...props: any): any => props;

/** @Description 抛出错误 */
export const err = (message: string = "未知错误") => {
  throw message;
};
