import React, {memo, ReactNode, useContext, useState} from "react";
import {useEffectOnce} from "react-use";
import {chaptersParser, Data, Dialog, err, File, is, jsonParse, pathParser} from "../method";
import {ElementProps} from "elementProperty";
import {toast} from "react-toastify";
import {Book, BookBodies} from "../@types/object";
import {useTranslation} from "react-i18next";
import {ShelfContextProps} from "../@types/context";

// @ts-ignore
const ShelfContext = React.createContext<ShelfContextProps>({});

export const ShelfProvider = memo(({ children }: ElementProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const { t } = useTranslation();
  useEffectOnce(loadShelf);

  /** 加载书架 */
  function loadShelf() {
    Data.select<Book>("bookshelf", {}).then((res) => {
      setBooks(res);
    });
  }

  /** @Description 添加书籍 */
  async function addBook() {
    try {
      const filePaths = await Dialog.select({
        title: "添加书籍",
        filters: [
          { name: "txt", extensions: ["txt", "epub"] },
          { name: "All Files", extensions: ["*"] },
        ],
      });
      await parserBook(filePaths[0]);
      toast.success(t("add successfully"));
    } catch (e) {
      toast.error(e as string);
    }
  }

  /** @Description 添加path路径的图书 */
  async function parserBook(path: string) {
    /*判断是否shelf中含有该书*/
    const data = await Data.select("bookshelf", { path: path });
    data.length && err("已经添加过该书籍。");
    /*解析书籍*/
    const { Chapters, total, titles } = await chaptersParser(path);
    /*保存body数据库*/
    const { _id } = await Data.insert<BookBodies>("bookBody", Chapters);
    const book: Book = {
      _id: _id,
      name: pathParser(path).name,
      path: path,
      total: total,
      progress: 0,
      titles: titles,
    };
    /*保存shelf数据库*/
    await Data.insert<Book>("bookshelf", book);
    loadShelf();
  }

  /** @Description 导出书架 */
  async function exportShelf() {
    try {
      const res = await Dialog.save("index.bookshelf");
      res.canceled && err("已取消导出");
      await File.save(res.filePath as string, JSON.stringify({ books: books }));
      toast.success("导出成功");
    } catch (e) {
      toast.error(e as string);
    }
  }

  /** @Description 导入书架 */
  async function importShelf() {
    try {
      /*选择书架文件*/
      const res = await Dialog.select({
        title: "打开书架",
        filters: [{ name: "bookshelf", extensions: ["bookshelf"] }],
      });
      /*解析书架文件*/
      const shelf = jsonParse<{ books: Book[] }>(await File.read(res[0]));
      /*判断文件格式*/
      !is<Book>(shelf, "books") && err("文件内容错误");
      /*循环解析书架书籍*/
      for (let book of shelf.books) await parserBook(book.path);
      toast.success("导入成功");
    } catch (e) {
      toast.error(e as string);
    }
  }

  /** @Description 备份当前书架的所有书籍 */
  async function backUpBook() {
    /*选择目录地址*/
    const res = await Dialog.directory();
    res.canceled && err("已取消备份");
    /*顺序复制书籍到置顶目录*/
    for (const item of books)
      await File.copy(item.path, res.filePaths[0] + `\\${item.name}.txt`);
  }

  return (
    <ShelfContext.Provider
      value={{
        books,
        addBook,
        loadShelf,
        exportShelf,
        importShelf,
        backUpBook,
      }}
    >
      {children as ReactNode}
    </ShelfContext.Provider>
  );
});

export const useShelf = () => useContext(ShelfContext);
