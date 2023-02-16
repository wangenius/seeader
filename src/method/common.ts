import {toast} from "react-toastify";

/** @Description try and catch with toast */
export const toa =
  (fn: Fn, suc: string = "执行成功", fail: string = "未知结果") =>
  async (...props: any) => {
    try {
      const { msg } = await fn(...props);
      toast.success(msg || suc);
    } catch (e) {
      console.log(e);
      toast.warning(fail);
    }
  };
/** @Description 空白方法 */
export const fn = (...props: any): any => props;

/** @Description 抛出错误 */
export function err(message: string = "未知错误") {
  throw message;
}
