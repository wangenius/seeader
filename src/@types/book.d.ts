/** @Description 定义基本书籍对象接口，包含id，名称，路径，标题和章节标题，当前进度等等 */
declare interface Book {
  /** @Description 数据库id */
  _id?: string;
  /** @Description 名称 */
  name: string;
  /** @Description 路径 */
  path: string;
  /** @Description 标题 */
  titles: chapterTitle[];
  /** @Description 总章数 */
  total: number;
  /** @Description 当前进度 */
  progress: number;
}

/** @Description 书籍正文接口 */
declare interface BookBodies {
  /** @Description 数据库id */
  _id?: string;

  /** @Description 章节序号和章节内容 */
  [propsName: number]: Chapter;
}

/** @Description 章节内容 */
declare interface Chapter extends chapterTitle {
  /** @Description 章节内容 */
  content: string;
}

/** @Description 章节标题 */
declare interface chapterTitle {
  /** @Description 序号 */
  index: number;
  /** @Description 标题 */
  title: string;
}

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
  deleteBook(book: Book[]): void;
  modalEditBook(book?: Book): void;
}


/** @Description shelf上下文 的属性和方法 */
declare interface ShelfContextProps {
  books: Book[];
  addBook(): void;
  exportShelf(): void;
  importShelf(): void;
  loadShelf(): void;
  backUpBook(items:Book[]): void;
}
