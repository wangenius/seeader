import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import __ from "lodash";
import { Settings } from "../@types/object";

export const initialTheme: Settings = {
  common: {
    startWithWin: false,
    minWithTray: false,
  },
  preference: {
    theme: "default",
    language: "en",
  },
  shelf: {},
  reading: {
    contentOpen: false,
    lineHeight: 18,
    fontSize: 10,
    fontFamily: "noto",
    paragraphSpacing: 0.8,
    dictionary: "local",
  },
  download: {
    downloadPath: "",
    cachePath: "",
  },
  sync: {},
};

export const settingsSlice = createSlice({
  name: "book",
  initialState: initialTheme,
  reducers: {
    toggleChaptersOpen(state, action: PayloadAction<boolean | undefined>) {
      state.reading.contentOpen = action.payload || !state.reading.contentOpen;
    },
    changeSettings(state, action: PayloadAction<Partial<Settings>>) {
      return __.defaultsDeep(action.payload, state);
    },
  },
});
