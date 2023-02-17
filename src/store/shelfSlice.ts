import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialShelf: Shelf = {
    books: []
};



export const shelfSlice = createSlice({
  name: "shelf",
  initialState: initialShelf,
  reducers: {
    lap: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
  },
});
