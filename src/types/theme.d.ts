declare interface ElementCase {
  main: string;
  reverse: string;
  [propsName: string]: string;
}

/** 主题原型*/
declare interface ThemePrototype {
  mode?: string;
  breakpoints?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  palette?: PalettePrototype;
  shadows?: ShadowsPrototype;
  typography?: {
    fontFamily: string;
  };
  transitions?: {};
  var?: {};
}

/** 标准主题原型*/
declare interface ThemeStandard extends ThemePrototype {
  mode: string;
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  palette: PalettePrototype;
  shadows: ShadowsPrototype;
  typography: {
    fontFamily: string;
  };
  transitions: {
    default: string;
  };
}

declare interface ElementEventState {
  default: string;
  hover: string;
  focus: string;
}

declare interface TypoPalette {
  title?: string;
  body?: string;
  subTitle?: string;
  tag?: string;
}

declare interface ShadowsPrototype {
  img: ElementEventState;
  box: ElementEventState;
  pop: ElementEventState;
}

declare interface PalettePrototype {
  primary: ElementCase;
  darkPrimary: ElementCase;
  background: ElementCase;
  container: ElementEventState;
  button: ElementEventState;
  buttonChar: ElementEventState;
  text: TypoPalette;
  border: ElementEventState;
  link: ElementEventState;
  shadows: ElementEventState;
  snack: ElementEventState;
  logo: ElementEventState;
  modal: ElementEventState;
  input: ElementEventState;
}

declare namespace Style {
  import { SxProps } from "@mui/system";
  type SX<Theme extends object = {}> = SxProps<Theme>;
  type SXs<Theme extends object = {}> = SX<Theme>[];
}
