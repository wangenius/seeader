import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export const initialBook: Book = {
  _id: "",
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
    lap: (state, action: PayloadAction<Partial<Book>>) =>
      _.defaultsDeep(action.payload, state),
    ban: (state, action: PayloadAction<Book>) => action.payload,
    closeBook: () => initialBook,
    nextProgress: (state) => {
      state.progress++;
    },
    lastProgress: (state) => {
      state.progress--;
    },
  },
});
