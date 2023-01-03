import React, { ReactNode, useContext, useState } from "react";
import { useEffectOnce } from "react-use";
import { useSnackbar } from "notistack";
import { err, voidFn } from "../method/general";
import { jsonParse, pathParser, textDecode } from "../method/parser";
import { ElementProps } from "elementProperty";
import { Dialog, FileInter } from "../method/Invoke";
import { feedState, PATH_CONS } from "../constant/state";

const booksInit: ShelfBook[] = [];

const ShelfContext = React.createContext({
  books: booksInit,
  addBook: () => {},
  updateBook: (book: ShelfBook) => {
    console.log(book);
  },
  deleteBook: (book: ShelfBook) => {
    console.log(book);
  },
  exportShelf: voidFn,
  backUpBook: voidFn,
});

interface bookshelfJson {
  books: ShelfBook[];
  name: string;
}

export const ShelfProvider = ({ children }: ElementProps) => {
  const [books, setBooks] = useState<ShelfBook[]>(booksInit);
  const { enqueueSnackbar } = useSnackbar();
  useEffectOnce(loadBooks);

  function loadBooks() {
    FileInter.read(PATH_CONS.bookshelfJsonPath)
      .then((buffer) => {
        setBooks(jsonParse(textDecode(buffer)).books);
      })
      .catch(() => {
        return FileInter.save(
          PATH_CONS.bookshelfJsonPath,
          JSON.stringify({ name: "", books: [] })
        );
      });
  }

  async function addBook() {
    try {
      const res = await Dialog.select({
        title: "添加书籍",
        filters: [
          { name: "txt", extensions: ["txt"] },
          { name: "All Files", extensions: ["*"] },
        ],
      });
      if (res.canceled) err("取消选择");
      let obj: bookshelfJson = jsonParse(
        textDecode(await FileInter.read(PATH_CONS.bookshelfJsonPath))
      );
      let newBook: ShelfBook = {
        name: pathParser(res.filePaths[0]).name,
        path: res.filePaths[0],
        progress: 0,
      };
      for (let i = 0; i < obj.books.length; i++)
        if (obj.books[i].path === newBook.path) err("已经添加过该书籍。");
      obj.books.push(newBook);
      await FileInter.save(PATH_CONS.bookshelfJsonPath, JSON.stringify(obj));
      loadBooks();
      enqueueSnackbar("添加成功。", feedState.SUCCESS);
    } catch (e) {
      enqueueSnackbar(e as string, feedState.ERROR);
    }
  }

  async function updateBook(targetBook: ShelfBook) {
    try {
      let result = books;
      for (let i = 0; i < result.length; i++) {
        if (result[i].path === targetBook.path) {
          result[i] = targetBook;
          break;
        }
      }
      console.log(result.length);
      if (result.length === 0) err();
      await FileInter.save(
        PATH_CONS.bookshelfJsonPath,
        JSON.stringify({ name: "", books: result })
      );
      loadBooks();
    } catch (e) {
      enqueueSnackbar(e as string, feedState.ERROR);
    }
  }

  async function deleteBook(targetBook: ShelfBook) {
    let result = books;
    for (let i = 0; i < result.length; i++) {
      if (result[i].path === targetBook.path) {
        result.splice(i, 1);
        break;
      }
    }
    await FileInter.save(
      PATH_CONS.bookshelfJsonPath,
      JSON.stringify({ name: "", books: result })
    );
    enqueueSnackbar("删除成功", { variant: "success" });
    loadBooks();
  }

  async function exportShelf() {
    try {
      const res = await Dialog.save("bookshelf.json");
      if (res.canceled) err("已取消导出");
      const path = res.filePath as string;
      await FileInter.copy(PATH_CONS.bookshelfJsonPath, path);
      enqueueSnackbar("导出成功", { variant: "success" });
    } catch (e) {
      enqueueSnackbar(e as string, { variant: "error" });
    }
  }

  async function backUpBook() {
    try {
      const res = await Dialog.directory();
      if (res.canceled) err("已取消备份");
      console.log(res.filePaths[0]);
      for (let i = 0; i < books.length; i++) {
        await FileInter.copy(
          books[i].path,
          res.filePaths[0] + `\\${books[i].name}.txt`
        );
      }
      enqueueSnackbar("备份成功", { variant: "success" });
    } catch (e) {
      let t = e as { [propsName: string]: any };
      enqueueSnackbar(t.message, { variant: "error" });
    }
  }

  return (
    <ShelfContext.Provider
      value={{
        books,
        addBook,
        updateBook,
        deleteBook,
        exportShelf,
        backUpBook,
      }}
    >
      {children as ReactNode}
    </ShelfContext.Provider>
  );
};

export const useShelf = () => useContext(ShelfContext);
