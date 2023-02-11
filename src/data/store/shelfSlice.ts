import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialShelf: Shelf = {
    books: []
};



export const shelfSlice = createSlice({
  name: "shelf",
  initialState: initialShelf,
  reducers: {
    change: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
  },
});
