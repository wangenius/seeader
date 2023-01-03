import { OptionsObject, VariantType } from "notistack";

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

export const PATH_CONS = {
  bookshelfJsonPath: "bookshelf.json",
};
