import React, { ReactNode, useContext } from "react";
import { DefaultTheme, themes } from "../@constant/themes";
import { ElementProps } from "elementProperty";
import { useAppDispatch, useAppSelector } from "../store/store";
import { themeSlice } from "../store/slice_theme";
import { useEffectOnce } from "react-use";
import { voidFn } from "../method/general";

const ThemeContext = React.createContext({
  theme: DefaultTheme,
  changeTheme: (theme: ThemeName) => voidFn(theme),
});
export const ThemeProvider = ({ children }: ElementProps) => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(themeSlice.actions.changeTheme(themes[theme.name as ThemeName]));
  });

  const changeTheme = (theme: ThemeName) =>
    dispatch(themeSlice.actions.changeTheme(themes[theme]));

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children as ReactNode}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
