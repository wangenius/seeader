import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../@types/object";
import __ from "lodash";

const initialState: Book = {
  name: "",
  path: "",
  titles: [],
  progress: 0,
  total: 0,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    changeProgress: (state, action: PayloadAction<number>) => {
      Object.assign(state, { progress: action.payload });
      // state.progress = action.payload;
    },
    changeBook: (state, action: PayloadAction<Partial<Book>>) => {
      return __.defaultsDeep(action.payload, state);
    },
    switchBook: (state, action: PayloadAction<Book>) => {
      return action.payload;
    },
    nextProgress: (state) => {
      state.progress += 1;
    },
    lastProgress: (state) => {
      state.progress -= 1;
    },
  },
});
