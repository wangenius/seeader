import {toast} from "react-toastify";

/** @Description try and catch with toast
 *  return a function which toast after the function you introduction in the params
 * */
export const toa =
  (fn: Fn, suc: string = "执行成功", fail: string = "未知结果") =>
  async (...props: any) => {
    try {
      const { code, msg } = await fn(...props);
      toast(msg || suc, {
        type:
          code === 1
            ? "success"
            : code === 0
            ? "warning"
            : code === -1
            ? "error"
            : "info",
      });
    } catch (e) {
      toast((e as string) || fail);
    }
  };
/** @Description 空白方法 */
export const fn = (...props: any): any => props;

/** @Description 抛出错误 */
export function err(message: string = "未知错误") {
  throw message;
}
