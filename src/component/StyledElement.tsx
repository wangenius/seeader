import * as React from "react";
import { forwardRef } from "react";
import { sxParser } from "../method/parser";

export const StyledElement = (
  Item: React.ForwardRefExoticComponent<any>,
  style: Style.SXs
) =>
  forwardRef(({ sx, ...other }: any, ref) => (
    <Item sx={sxParser(style as Style.SXs, sx)} {...other} ref={ref} />
  ));
