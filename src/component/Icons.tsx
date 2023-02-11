import { Once } from "./Once";
import * as React from "react";
import { memo, ReactNode } from "react";
import { Ring } from "@uiball/loaders";
import clsx from "clsx";

const required = require.context(`../svg`, true, /\.svg$/);
/** @Description icons是图标包 直接跟上variable名即可 variable名为文件名*/
export const icons: { [propsName: string]: ReactNode } = {};

/** @Description 生成 */
required!
  .keys()
  .map(required)
  .map(
    (it: any) =>
      (icons[it.default.id] = (
        <svg children={<use xlinkHref={"#" + it.default.id} />} />
      ))
  );

/** @Description svg container root element => div */
export const SVG = ({ open, cs, icon, ...rest }: Props.SvgIcon) => (
  <Once open={open} cs={clsx("SvgIcon", cs)} children={icon} {...rest} />
);

export const LoadingRing = memo((props: Props.Once) => (
  <Once open={props.open} cs={"loader"}>
    <Ring size={35} color={`${"#3e4859"}`} />
  </Once>
));
