import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import _ from "lodash";
import {_sets} from "@/data/method/_sets";
import {Settings} from "local";

/** @Description 设置slice */
export const settingsStore = createSlice({
  name: "settings",
  initialState: window.req<Settings>(_sets.path),
  reducers: {
    /** @Description 更改设置 */
    lap: (state, action: PayloadAction<Partial<Settings>>) =>
      _.defaultsDeep(action.payload, state),
    ban: (state, action: PayloadAction<Settings>) => action.payload,
  },
});
