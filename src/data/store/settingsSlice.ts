import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import _ from "lodash";
import {defaultSettings} from "local";
import {json} from "@/method";
import {_sets} from "@/data";

/** @Description 设置slice */
export const settingsStore = createSlice({
  name: "settings",
  initialState: json<Setting>(_sets.path),
  reducers: {
    /** @Description 更改设置 */
    changeSettings: (state, action: PayloadAction<Partial<Setting>>) =>
      _.defaultsDeep(action.payload, state),
    /** @Description 恢复设置 */
    reset: () => defaultSettings,
  },
});
