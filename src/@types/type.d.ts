/** @Description button or container value */
type Value = string | number | boolean | symbol | undefined;
/** @Description Click event */
type Click = (
  event: MouseEvent<HTMLDivElement>,
  value: Value,
  ...rest: any[]
) => any;
/** @Description localizer position */
type LocalizerBase = "top" | "bottom" | "right_middle";
/** @Description */
type Label = import("i18next").TFuncKey | string | undefined;

/** @Description 定义基本方法 */
declare type Fn = (...props: any) => any;
/** @Description 定义返回类型 */
declare type Toa =
  | { code: 0 | 1 | -1; msg: string }
  | Promise<{ code: 0 | 1 | -1; msg: string }>;
