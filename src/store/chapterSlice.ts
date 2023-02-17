import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialChapter: string[] = [];
export const chapterSlice = createSlice({
  name: "chapter",
  initialState: initialChapter,
  reducers: {
    change: (state, action: PayloadAction<string[]>) => action.payload,
  },
});
