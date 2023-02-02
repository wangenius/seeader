import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export const initialBook: Book = {
  name: "",
  path: "",
  titles: [],
  progress: 0,
  total: 0,
};

export const bookSlice = createSlice({
  name: "book",
  initialState: initialBook,
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
