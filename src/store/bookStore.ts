import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState: Book = {
  name: "",
  path: "",
  titles: [],
  progress: 0,
  total: 0,
};

export const bookStore = createSlice({
  name: "book",
  initialState,
  reducers: {
    changeProgress: (state, action: PayloadAction<number>) =>
      Object.assign(state, { progress: action.payload }),
    changeBook: (state, action: PayloadAction<Partial<Book>>) =>
      _.defaultsDeep(action.payload, state),
    switchBook: (state, action: PayloadAction<Book>) => action.payload,
    nextProgress: (state) => {
      state.progress += 1;
    },
    lastProgress: (state) => {
      state.progress -= 1;
    },
  },
});
