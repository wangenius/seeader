import React, { ReactNode, useContext, useState } from "react";
import { DefaultTheme } from "./Theme";
import { ElementProps } from "../interface";

/** 主题原型*/
export interface ThemePrototype {
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
export interface ThemeStandard extends ThemePrototype {
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

interface ElementEventState {
  default: string;
  hover: string;
  focus: string;
}
interface ElementCase {
  main: string;
  reverse: string;
  [propsName: string]: string;
}
interface TypoPalette {
  title?: string;
  body?: string;
  subTitle?: string;
  tag?: string;
}

interface ShadowsPrototype {
  img: ElementEventState;
  box: ElementEventState;
  pop: ElementEventState;
}
interface PalettePrototype {
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

const ThemeContext = React.createContext({
  theme: DefaultTheme,
  changeTheme: (theme: ThemePrototype) => {},
});
export const ThemeProvider = ({ children }: ElementProps) => {
  const [theme, setTheme] = useState<ThemeStandard>(DefaultTheme);

  async function GenerateTheme(theme: ThemePrototype | ThemeStandard) {
    return (await Object.assign<{}, ThemeStandard, ThemePrototype>(
      {},
      DefaultTheme,
      theme
    )) as ThemeStandard;
  }

  async function changeTheme(theme: ThemePrototype) {
    const C = await GenerateTheme(theme);
    setTheme(C);
    // dispatch(changeThemeReducer(C));
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children as ReactNode}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return {
    theme: theme,
    changeTheme: changeTheme,
  };
}
