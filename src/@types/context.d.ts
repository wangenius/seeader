import { Book } from "./object";
import { ReactNode } from "react";

declare interface BookContextProps {
  book: Book;
  currentBody: string[];
  openBook(target?: Book): void;
  nextPage(): void;
  lastPage(): void;
  jumpToPage(index: number): void;
  modalAddBookmark(content?: string): void;
  updateBook(book?: Partial<Book>): void;
  changeBook(pair: Partial<Book>): void;
  deleteBook(book?: Book): void;
  modalEditBook(book?: Book): void;
}

declare interface ShelfContextProps {
  books: Book[];
  addBook(path: string): void;
  exportShelf(): void;
  importShelf(): void;
  loadShelf(): void;
  backUpBook(): void;
}

declare interface ThemeContextProps {
  theme: ThemeStandard;
  changeTheme: (theme: ThemeName) => void;
}

declare interface ModalContextProps {
  closeModal(): void;
  modal(content: ReactNode): void;
}

declare type Fn = (...props: any) => any;
