import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import _ from "lodash";
import {_sets} from "@/data";
import {file} from "@/method/file";

/** @Description 设置slice */
export const settingsStore = createSlice({
  name: "settings",
  initialState: file.json_read<Setting>(_sets.path),
  reducers: {
    /** @Description 更改设置 */
    changeSettings: (state, action: PayloadAction<Partial<Setting>>) =>
      _.defaultsDeep(action.payload, state),
    /** @Description 恢复设置 */
    reset: () => _sets.default,
  },
});
