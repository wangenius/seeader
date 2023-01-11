declare interface ThemeStatesStandard {
  default?: string;
  hover?: string;
  focus?: string;
  [propsName: string]: string;
}

declare interface ComponentTheme {
  readonly font?: string;
  readonly backgroundColor?: ThemeStatesStandard;
  readonly border?: ThemeStatesStandard;
  readonly color?: ThemeStatesStandard;
  readonly shadow?: ThemeStatesStandard;
  readonly background?: ThemeStatesStandard;
}

/** 标准主题原型*/
declare interface ThemeStandard {
  readonly name: ThemeName;
  readonly default: ComponentTheme;
  readonly docker: ComponentTheme;
  readonly button: ComponentTheme;
  readonly input: ComponentTheme;
  readonly divider: ComponentTheme;
  readonly icon: ComponentTheme;
  readonly modal: ComponentTheme;
}

declare namespace Style {
  import { SxProps } from "@mui/system";
  type SX<Theme extends object = {}> = SxProps<Theme>;
  type SXs<Theme extends object = {}> = SX<Theme>[];
}

declare type ThemeName = "default" | "dark";
