import { ElementProps } from "elementProperty";
import { SxProps, Theme } from "@mui/system";
import { ReactNode } from "react";

declare interface SvgIconPrototype extends JSX.Element {}

declare interface IconButtonProps extends ElementProps {
  children?: SvgIconPrototype;
  icon?: SvgIconPrototype | string;
  SvgSx?: SxProps<Theme>;
  size?: number;
}

declare interface SvgIconProps extends ElementProps {
  size?: number;
  icon?: ReactNode;
}