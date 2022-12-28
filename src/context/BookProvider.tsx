import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ElementProps } from "../interface";
import { useAppDispatch, useAppSelector } from "../store/store";
import { changeBookStore } from "../store/currentBookReducer";

const path = window.require("path");

const fs = window.require("fs");
const iconvLite = window.require("iconv-lite");
const { BrowserWindow, dialog, Menu, MenuItem, getCurrentWindow } =
  window.require("@electron/remote");
interface Chapter {
  index: number;
  title: string;
  content: string;
}

export interface Book {
  name: string;
  path: string;
  chapters: Chapter[];
  progress: number;
}

const bookInit: Book = {
  name: "",
  path: "",
  chapters: [],
  progress: 0,
};

const BookContext = React.createContext({
  book: bookInit,
  changBook: (book: Book) => {},
  openBook: () => {},
  changeCurrentChapter: (index: number) => {},
  currentChapter: 0,
});

export const BookProvider = ({ children }: ElementProps) => {
  const currentBook = useAppSelector((state) => state.currentBook);
  const dispatch = useAppDispatch();
  const [book, setBook] = useState<Book>(currentBook);
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const reg =
    /((?<=\s|\S+|\d+)【\S+】)|((?<=^|\s)第\S{1,5}章\S*\s)|((?<=^|\s)\d+.\d+\s)/g;
  const regCheck =
    /(【\S+】)|((?<=^|\s)第\S{1,5}章\S*\s)|((?<=^|\s)\d+.\d+\s)/g;

  useEffect(() => {
    setBook(currentBook);
  }, [currentBook]);

  /** @overview 更改章节*/
  function changeCurrentChapter(index: number) {
    setCurrentChapter(index);
  }

  async function generateChapters(text: string) {
    const chapterArray2 = text.split(reg).filter(Boolean);
    let arrayItem = {
      index: 0,
      title: "",
      content: "",
    };
    let chaptersList: Chapter[] = [];
    for (let i = 0; i < chapterArray2.length; i++) {
      if (regCheck.test(chapterArray2[i])) {
        arrayItem.title = arrayItem.title + chapterArray2[i];
      } else if (!regCheck.test(chapterArray2[i])) {
        arrayItem.content = arrayItem.content + chapterArray2[i];
      }
      if (
        i !== 0 &&
        regCheck.test(chapterArray2[i - 1]) &&
        !regCheck.test(chapterArray2[i])
      ) {
        chaptersList.push(arrayItem);
        arrayItem = { index: chaptersList.length, title: "", content: "" };
      }
    }
    return chaptersList;
  }

  async function openBook() {
    const res = dialog.showOpenDialogSync({
      title: "读取文件", // 对话框窗口的标题
      filters: [
        { name: "txt", extensions: ["txt"] },
        { name: "All Files", extensions: ["*"] },
      ],
    });
    if (res === undefined) throw "false";
    try {
      const { contents, paths } = parserTextFile(res[0]);
      const data = await generateChapters(contents);

      dispatch(
        changeBookStore({
          name: path.parse(paths).name || "未命名",
          path: paths,
          chapters: data,
          progress: currentChapter,
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  async function changBook(book: Book) {
    setBook(book);
  }

  return (
    <BookContext.Provider
      value={{
        book,
        changBook,
        changeCurrentChapter,
        currentChapter,
        openBook,
      }}
    >
      {children as ReactNode}
    </BookContext.Provider>
  );
};

export function useBook() {
  const { book, changBook, changeCurrentChapter, currentChapter, openBook } =
    useContext(BookContext);

  return {
    book: book,
    openBook: openBook,
    changBook: changBook,
    changeCurrentChapter: changeCurrentChapter,
    currentChapter: currentChapter,
  };
}

const parserTextFile = (path: string): { contents: string; paths: string } => {
  let contents = fs.readFileSync(path);
  if (contents[0] === 0xef && contents[1] === 0xbb && contents[2] === 0xbf) {
    contents = contents.slice(3);
  } else {
    contents = iconvLite.decode(contents, "gbk");
  }
  contents = contents.toString();
  return { contents: contents, paths: path };
};
