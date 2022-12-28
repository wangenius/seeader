import { LegacyRef, ReactNode } from "react";
import { SxProps, Theme } from "@mui/system";
import { Style, Styles } from "./style/sx";

export type ElementRef = LegacyRef<HTMLDivElement> | undefined;
export interface ElementProps {
  children?: ReactNode;
  id?: string;
  sx?: SxProps<Theme>;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  open?: boolean;
}

export function voidFn() {}
