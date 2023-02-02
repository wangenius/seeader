import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import _ from "lodash";
import {FontSize, LineHeight, ParagraphSpacing} from "../@constant/settings";

/** @Description 初始化设置*/
export const initialSettings: Settings = {
  common: {
    startWithWin: false,
    minWithTray: false,
  },
  preference: {
    theme: "default",
    language: "en",
  },
  reading: {
    contentOpen: false,
    lineHeight: LineHeight.medium,
    fontSize: FontSize.medium,
    paragraphSpacing: ParagraphSpacing.medium,
    fontFamily: "noto",
    dictionary: "local",
  }
};

/** @Description 设置slice */
export const settingsSlice = createSlice({
  name: "book",
  initialState: initialSettings,
  reducers: {
    /** @Description 开关目录docker */
    toggleChaptersOpen(state, action: PayloadAction<boolean | undefined>) {
      state.reading.contentOpen = action.payload || !state.reading.contentOpen;
    },
    /** @Description 更改设置 */
    changeSettings(state, action: PayloadAction<Partial<Settings>>) {
      return _.defaultsDeep(action.payload, state);
    },
  },
});
