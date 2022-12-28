import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ElementProps } from "../interface";
import { useAppDispatch, useAppSelector } from "../store/store";
import { changeBookStore } from "../store/currentBookReducer";
import { useEffectOnce } from "react-use";
const path = window.require("path");
const fs = window.require("fs");
const iconvLite = window.require("iconv-lite");
const { BrowserWindow, dialog, Menu, MenuItem, getCurrentWindow } =
  window.require("@electron/remote");

interface ShelfBook {
  name: string;
  path: string;
  progress: number;
}

const booksInit: ShelfBook[] = [];

const ShelfContext = React.createContext({
  books: booksInit,
  addBook: () => {},
});

export const ShelfProvider = ({ children }: ElementProps) => {
  const dispatch = useAppDispatch();
  const [books, setBooks] = useState<ShelfBook[]>(booksInit);
  const reg =
    /((?<=\s|\S+|\d+)【\S+】)|((?<=^|\s)第\S{1,5}章\S*\s)|((?<=^|\s)\d+.\d+\s)/g;
  const regCheck =
    /(【\S+】)|((?<=^|\s)第\S{1,5}章\S*\s)|((?<=^|\s)\d+.\d+\s)/g;

  useEffectOnce(init);

  function init() {
    fs.readFile("bookshelf.json", (err: any, data: string) => {
      if (err || data.length === 0)
        return fs.writeFileSync(
          "bookshelf.json",
          JSON.stringify({ name: "", books: [] })
        );
      setBooks(JSON.parse(data).books);
    });
  }

  async function addBook() {
    const res = dialog.showOpenDialogSync({
      title: "添加", // 对话框窗口的标题
      filters: [
        { name: "txt", extensions: ["txt"] },
        { name: "All Files", extensions: ["*"] },
      ],
    });
    if (res === undefined) throw "false";
    try {
      let newBook = {
        name: path.parse(res[0]).name,
        path: res[0],
        progress: 0,
      };
      fs.readFile("bookshelf.json", (err: any, data: string) => {
        let obj: { name: string; books: ShelfBook[] } = { name: "", books: [] };
        if (err) {
          obj.books.push(newBook);
          return fs.writeFileSync("bookshelf.json", JSON.stringify(obj));
        }
        obj = JSON.parse(data);
        obj.books.push(newBook);
        fs.writeFileSync("bookshelf.json", JSON.stringify(obj));
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ShelfContext.Provider
      value={{
        books,
        addBook,
      }}
    >
      {children as ReactNode}
    </ShelfContext.Provider>
  );
};

export function useShelf() {
  const { books, addBook } = useContext(ShelfContext);

  return {
    books: books,
    addBook: addBook,
  };
}
