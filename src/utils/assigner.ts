import { OptionsObject, VariantType } from "notistack";

/*消息提醒*/
const success: OptionsObject = { variant: "success" };
const error: OptionsObject = { variant: "error" };
const warning: OptionsObject = { variant: "warning" };
const info: OptionsObject = { variant: "info" };
const variant = (v: VariantType): OptionsObject => {
  return { variant: v };
};
export const feedState = {
  SUCCESS: success,
  ERROR: error,
  WARNING: warning,
  INFO: info,
  variant: variant,
};

/*状态*/
export enum State {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

/*方法返回值*/
export enum RESULT {
  SUCCESS = 1,
  FAIL = 0,
}
