/** @define 正文内容 */
declare type Content = string;

/** @Description 书架对象 */
declare interface Shelf {
  books: Book[];
}

/** @Description 定义基本书籍对象接口，包含id，名称，路径，标题和章节标题，当前进度等等 */
declare interface Book {
  /** @Description Book id */
  _id: string;
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
declare interface Chapter {
  /** @Description chapter id */
  _id: string;
  /** @Description chapter index */
  index: number;
  /** @Description chapter title */
  title: string;
  /** @Description chapter paragraphs */
  content: string[];
}

/** @Description 章节标题 */
declare interface chapterTitle {
  /** @Description 序号 */
  index: number;
  /** @Description 标题 */
  title: string;
}
