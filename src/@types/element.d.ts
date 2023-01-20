declare module "elementProperty" {
  import { BoxProps, SxProps, Theme } from "@mui/system";
  import { ReactNode, TextareaHTMLAttributes } from "react";

  export interface ElementProps extends BoxProps {
    children?: ReactNode;
    id?: string;
    index?: number;
    sx?: SxProps<Theme>;
    cls?: string;
    onClick?(...props): any;
    onContextMenu?(...props): any;
    loading?: boolean;
    open?: boolean;
  }

  interface TextInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    init?: string;
    children?: ReactNode;
    id?: string;
    sx?: SxProps<Theme>;
    loading?: boolean;
    open?: boolean;
    button?: boolean;
    onClick: (value: string) => void;
  }

  interface ButtonProperty extends ElementProps {
    index?: number;
    value?: string;
    startIcon?: ReactNode;
    state?: "active" | "none";
    label?: string;
    endIcon?: ReactNode;
    href?: string;
    tip?: boolean;
    small?: boolean;
  }
  interface MenuProps extends ButtonProperty {
    children: Menu_Options;
  }
  interface MenuButtonProperty extends ButtonProperty {
    context: Menu_Options;
    size?:number
  }

  interface ContainerProps extends ElementProps {
    state?: string;
    focus?: boolean;
  }

  interface MenuItemProps extends ButtonProperty {
    children: Menu_Options;
    type?: "item" | "menu" | "divider" | "title";
  }
  interface ListButtonValue extends ButtonProperty {
    index: number;
    isActive?: boolean;
  }
  interface Menu_Options {
    type: "menu" | "item" | "divider" | "title";
    open?: boolean;
    label?: ReactNode;
    icon?: ReactNode;
    shortcuts?: string;
    style?: Style.SX;
    sub?: Menu_Options[];
    check?: boolean;
    onClick?(): any;
    allowed?: boolean;
  }
}
