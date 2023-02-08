import { Once } from "./Once";
import * as React from "react";
import { memo, ReactNode } from "react";
import { Ring } from "@uiball/loaders";
import clsx from "clsx";

const req = require.context("../../public/svg", true, /\.svg$/);

export const LoadingRing = memo((props: Props.Once) => (
  <Once open={props.open} cs={"loader"}>
    <Ring size={35} color={`${"#3e4859"}`} />
  </Once>
));

/** @Description  type generated*/
interface Icons {
  [propsName: string]: ReactNode;
}

/** @Description Icons是图标包 直接跟上variable名即可 variable名为文件名，首字母大写 */
export const Icons: Icons = {};

/** @Description 生成 */
req
  .keys()
  .map(req)
  .map((item, key) => {
    const X = (item as any).default;
    return (Icons[X.name.slice(3, X.name.length)] = <X />);
  });

/** @Description svg container root element => div */
export const SVG = (props: Props.SvgIcon) => {
  const { open, cs, icon, ...rest } = props;
  return (
    <Once open={open} cs={clsx("SvgIcon", cs)} children={icon} {...rest} />
  );
};
