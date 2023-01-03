declare module "elementProperty" {
  import { BoxProps, SxProps, Theme } from "@mui/system";
  import { ReactNode } from "react";

  export interface ElementProps extends BoxProps {
    children?: ReactNode;
    id?: string;
    sx?: SxProps<Theme>;
    className?: string;
    onClick?(): any;
    loading?: boolean;
    open?: boolean;
  }
  interface ButtonProperty extends ElementProps {
    index?: number;
    value?: string;
    startIcon?: ReactNode;
    label?: string;
    endIcon?: ReactNode;
    href?: string;
    tip?: boolean;
    small?: boolean;
  }
  interface MenuProperty extends ButtonProperty {
    children: Menu_Options;
  }
  interface ContainerProps extends ElementProps {
    flexLayout?: boolean;
    proportion?: number;
    vertex?: boolean;
    full?: boolean;
    col?: boolean;
    verticalCenter?: boolean;
    horizonCenter?: boolean;
  }

  interface AnimatedProps extends ElementProps {
    onExit: () => void;
    onEnter: () => void;
    delay?: number | undefined;
    open: boolean;
    from?: Function | {};
    to?: Function | {};
    config?: {};
    pause?: boolean;
    loop?: boolean | Function;
    cssString?: string;
  }

  interface TypoProps extends ElementProps {
    variant?: string;
  }

  interface popProps {
    anchor: HTMLElement;
    configs?: PopConfigs;
  }

  interface PopConfigs {
    duration?: number;
    easing?: any;
    decay?: number | boolean;
  }
  interface MenuItemProperty extends ButtonProperty {
    children: Menu_Options;
    type?: "item" | "menu" | "divider" | "title";
  }
  interface ListButtonValue extends ButtonProperty {
    index: number;
    isActive?: boolean;
  }
}
