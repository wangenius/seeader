import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { changeBookStore } from "../store/currentBookReducer";
import { useShelf } from "./ShelfProvider";
import { useNavigate } from "react-router-dom";
import { bufferDecode } from "../method/parser";
import { useSnackbar } from "notistack";
import { useHotkeys } from "react-hotkeys-hook";
import { voidFn } from "../method/general";
import { usePath } from "../hook/usePath";
import { ElementProps } from "elementProperty";
import { FileInter } from "../method/Invoke";

const bookInit: Book = {
  name: "",
  path: "",
  chapters: [],
  progress: 0,
};

const BookContext = React.createContext({
  book: bookInit,
  openBook: voidFn,
  nextPage: voidFn,
  lastPage: voidFn,
  changeCurrentChapter: voidFn,
  toggleChapterDocker: voidFn,
  chapterDocker: true,
});

export const BookProvider = ({ children }: ElementProps) => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { updateBook } = useShelf();
  const book = useAppSelector((state) => state.currentBook);
  const { enqueueSnackbar: snackbar } = useSnackbar();
  const [chapterDocker, setChapterDocker] = useState<boolean>(
    localStorage.getItem("chapterDocker") !== null
  );
  const [totalIndex, setTotalIndex] = useState(book.chapters.length);
  const [currentPage, setCurrentPage] = useState<number>(book.progress);
  const { isReading } = usePath();
  const { enqueueSnackbar } = useSnackbar();
  useHotkeys("right", nextPage, {
    enabled: currentPage < totalIndex - 1 && isReading,
  });
  useHotkeys("left", lastPage, { enabled: currentPage > 0 && isReading });

  const reg =
    /((?<=\s|\S+|\d+)【\S+】)|((?<=^|\s)第\S{1,5}章\S*\s)|((?<=^|\s)\d+.\d+\s)/g;
  const regCheck =
    /(【\S+】)|((?<=^|\s)第\S{1,5}章\S*\s)|((?<=^|\s)\d+.\d+\s)/g;

  function toggleChapterDocker() {
    setChapterDocker((pre) => {
      if (!pre) {
        localStorage.setItem("chapterDocker", "true");
      } else {
        localStorage.removeItem("chapterDocker");
      }

      return !pre;
    });
  }

  useEffect(() => {
    setCurrentPage(book.progress);
    setTotalIndex(book.chapters.length);
  }, [book]);

  useEffect(() => {
    if (currentPage > 0 || currentPage + 1 < book.chapters.length) {
      dispatch(
        changeBookStore({
          name: book.name,
          path: book.path,
          chapters: book.chapters,
          progress: currentPage,
        })
      );
      return;
    }
    if (currentPage < 0) {
      enqueueSnackbar("前面没有内容", { variant: "info" });
      setCurrentPage(0);
      return;
    }
    if (currentPage + 1 >= book.chapters.length) {
      enqueueSnackbar("已经到最后一章了", { variant: "info" });
      setCurrentPage(book.chapters.length - 1);
      return;
    }
  }, [currentPage]);

  function nextPage() {
    setCurrentPage((prevState) => prevState + 1);
  }
  function lastPage() {
    setCurrentPage((prevState) => prevState - 1);
  }
  function changeCurrentChapter(index: number) {
    setCurrentPage(index);
  }

  function generateChapters(text: string) {
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

  async function openBook(targetBook: ShelfBook) {
    try {
      /*更新当前书状态*/
      updateBook({
        name: book.name,
        path: book.path,
        progress: book.progress,
      });
      /*打开书*/
      const res = await FileInter.read(targetBook.path);
      const text = bufferDecode(res);
      const data = generateChapters(text);
      dispatch(
        changeBookStore({
          name: targetBook.name,
          path: targetBook.path,
          chapters: data,
          progress: targetBook.progress,
        })
      );
      nav("./");
    } catch (e) {
      let t = e as { [propsName: string]: any };
      snackbar(t.message, { variant: "error" });
    }
  }

  return (
    <BookContext.Provider
      value={{
        book,
        changeCurrentChapter,
        nextPage,
        lastPage,
        toggleChapterDocker,
        chapterDocker,
        openBook,
      }}
    >
      {children as ReactNode}
    </BookContext.Provider>
  );
};

export const useBook = () => useContext(BookContext);
