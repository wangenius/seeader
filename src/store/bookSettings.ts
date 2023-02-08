import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import _ from "lodash";
import {Settings as Set} from "a_root";

/** @Description 初始化设置*/
export const initialSettings: SettingObject = {
  common: {
    minWithTray: Set.minWithTray.yes,
  },
  preference: {
    theme: "default",
    language: Set.language.english,
  },
  reading: {
    chapterDocker: Set.chapterDocker.show,
    lineHeight: Set.lineHeight.medium,
    fontSize: Set.fontSize.medium,
    paragraphSpacing: Set.paragraphSpacing.medium,
    fontFamily: "noto",
    dictionary: Set.dictionary.local,
  }
};

/** @Description 设置slice */
export const settingsStore = createSlice({
  name: "book",
  initialState: initialSettings,
  reducers: {
    /** @Description 更改设置 */
    changeSettings(state, action: PayloadAction<Partial<SettingObject>>) {
      return _.defaultsDeep(action.payload, state);
    },
  },
});
