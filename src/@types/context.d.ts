/** @Description book context 属性和方法*/
declare interface BookContextProps {
  book: Book;
  currentBody: string[];
  openBook(target?: Book): void;
  nextPage(): void;
  lastPage(): void;
  jumpToPage(index: number): void;
  updateBook(book?: Partial<Book>): void;
  changeBook(pair: Partial<Book>): void;
  deleteBook(book?: Book): void;
  modalEditBook(book?: Book): void;
}

/** @Description shelf上下文 的属性和方法 */
declare interface ShelfContextProps {
  books: Book[];
  addBook(): void;
  exportShelf(): void;
  importShelf(): void;
  loadShelf(): void;
  backUpBook(): void;
}



