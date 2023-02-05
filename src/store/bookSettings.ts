import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import _ from "lodash";
import {SETTINGS} from "../@constant";

/** @Description 初始化设置*/
export const initialSettings: Settings = {
  common: {
    minWithTray: SETTINGS.minWithTray.yes,
  },
  preference: {
    theme: "default",
    language: SETTINGS.language.english,
  },
  reading: {
    chapterDocker: SETTINGS.chapterDocker.show,
    lineHeight: SETTINGS.lineHeight.medium,
    fontSize: SETTINGS.fontSize.medium,
    paragraphSpacing: SETTINGS.paragraphSpacing.medium,
    fontFamily: "noto",
    dictionary: SETTINGS.dictionary.local,
  }
};

/** @Description 设置slice */
export const settingsStore = createSlice({
  name: "book",
  initialState: initialSettings,
  reducers: {
    /** @Description 更改设置 */
    changeSettings(state, action: PayloadAction<Partial<Settings>>) {
      return _.defaultsDeep(action.payload, state);
    },
  },
});
