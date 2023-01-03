import React, { ReactNode, useContext, useState } from "react";
import { DefaultTheme } from "../constant/themes";
import { ElementProps } from "elementProperty";

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
