type Value = string | number | boolean | symbol | undefined;
type Click = (
  event: MouseEvent<HTMLDivElement>,
  value: Value,
  ...rest: any[]
) => any;
type LocalizerBase = "top" | "bottom" | "right_middle";
/** @Description */
type Label = import("i18next").TFuncKey | string | undefined;

/** @Description 定义基本方法 */
declare type Fn = (...props: any) => any;