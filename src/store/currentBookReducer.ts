import { ThemePrototype, ThemeStandard } from "../context/ThemeProvider";
import { Book } from "../context/BookProvider";

interface book {
  type: string;
  book: Book;
}
const bookInit: Book = {
  name: "",
  path: "",
  chapters: [],
  progress: 0,
};

export const currentBookReducer = (state: Book = bookInit, action: book) => {
  switch (action.type) {
    case "changeBook":
      return action.book;
    default:
      return state;
  }
};

export const changeBookStore = (book: Book) => {
  return {
    type: "changeBook",
    book: book,
  };
};
