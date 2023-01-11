import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultTheme } from "../@constant/themes";
import __ from "lodash";

const initialState: ThemeStandard = DefaultTheme;

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<Partial<ThemeStandard>>) => {
      return __.defaultsDeep(action.payload, DefaultTheme);
    },
  },
});
