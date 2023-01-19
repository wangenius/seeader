import React, { memo, ReactNode, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useShelf } from "./ShelfProvider";
import { useNavigate } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";
import { usePath } from "../hook/usePath";
import { ElementProps } from "elementProperty";
import { bookSlice } from "../store/slice_book";
import { Container } from "../component/Container";
import _ from "lodash";
import { TextInput } from "../component/Input";
import { useModal } from "./ModalProvider";
import { Book, BookBodies } from "../@types/object";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Data } from "../method/data";
import { BookContextProps } from "../@types/context";

// @ts-ignore
const BookContext = React.createContext<BookContextProps>({});

export const BookProvider = memo(({ children }: ElementProps) => {
  const book = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { loadShelf } = useShelf();
  const { isReading } = usePath();
  const { modal, closeModal } = useModal();
  const [currentBody, setCurrentBody] = useState<string[]>([]);
  const { t } = useTranslation();

  /** 当book改变时，重新加载章节内容 */
  useEffect(loadChapterBody, [book, book.progress]);

  useHotkeys("right", nextPage, {
    enabled: book.progress < book.total - 1 && isReading,
  });

  useHotkeys("left", lastPage, {
    enabled: book.progress > 0 && isReading,
  });

  /** @Description 更改当前书籍信息 */
  const changeBook = async (book: Partial<Book>) =>
    dispatch(bookSlice.actions.changeBook(book));

  /** @Description 跳转章节 */
  async function jumpToPage(index: number) {
    setCurrentBody([]);
    await changeBook({ progress: index });
  }

  function nextPage() {
    setCurrentBody([]);
    dispatch(bookSlice.actions.nextProgress());
  }
  function lastPage() {
    setCurrentBody([]);
    dispatch(bookSlice.actions.lastProgress());
  }

  /** @description 从数据库中加载书籍信息 */
  async function loadBook(target?: Book) {
    const res = await Data.select<Book>("bookshelf", {
      _id: target?._id || book._id,
    });
    await dispatch(bookSlice.actions.switchBook(res[0]));
  }

  /** @Description 打开书籍(1.更新当前书数据库信息 2.加载目标书籍) */
  async function openBook(target: Book) {
    await updateBook();
    await loadBook(target);
    nav("/");
  }

  /** @Description 加载书籍正文内容 */
  function loadChapterBody() {
    Data.select<BookBodies>(
      "bookBody",
      { _id: book._id },
      { [book.progress]: 1 }
    )
      .then((res) => {
        if (!res.length) return;
        let result: string[] = [];
        res[0][book.progress]?.content.split(/\r\n|\n/).map((item: string) => {
          result.push(item.replace(/(^\s+)|(\s+$)/g, "").replace(/\s/g, ""));
        });
        setCurrentBody(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /** @Description 更新当前数据库信息 无参数时更新当前书籍信息，一个参数时更新目标书籍信息（参数内含有_id），两个参数时更新_id=id的对象信息 */
  async function updateBook(targetBook?: Partial<Book>, id?: string) {
    await Data.update<Book>(
      "bookshelf",
      { _id: id || targetBook?._id || book._id },
      targetBook || book
    );
    await loadShelf();
  }

  /** @Description 编辑书籍信息 */
  async function editBook(pair: Partial<Book>, target?: Book) {
    /*当编辑书籍是正在阅读书籍时，上传最新书籍信息*/
    if (target?._id === book._id || !target?._id) await updateBook();
    /*更新书籍编辑信息*/
    await updateBook(pair, target?._id || book._id);
    /*当编辑书籍是正在阅读书籍时，重新加载书籍*/
    if (target?._id === book._id || !target?._id) await loadBook();
    toast.success(t("update successfully"));
  }

  /** @Description 编辑书籍信息，当前仅支持修改标题 */
  async function modalEditBook(target?: Book) {
    modal(
      <Container sx={{ width: 500, height: 300 }}>
        <TextInput
          button
          onClick={async (value) => {
            await editBook({ name: value }, target);
            closeModal();
          }}
          placeholder={"重命名"}
          defaultValue={target?.name || book.name}
        ></TextInput>
      </Container>
    );
  }

  /** @Description 添加书签 */
  function modalAddBookmark(content?: string) {
    modal(
      <>
        <Container
          sx={{
            backgroundColor: "rgba(40,40,40,0.68)",
            p: 1,
            mb: 3,
            mt: 3,
            overflow: "visible",
            boxSizing: "border-box",
            width: 400,
            height: 110,
            borderRadius: 2,
            zIndex: 0,
            color: "rgb(250,250,250)",
            backdropFilter: "blur(10px)",
            ":after": {
              content: "''",
              position: "absolute",
              top: "100%",
              left: "10%",
              marginLeft: 0,
              borderWidth: 12,
              borderStyle: "solid",
              borderColor:
                "rgba(40,40,40,0.68) transparent transparent transparent",
              zIndex: -1,
            },
          }}
        >
          {_.truncate(content || window.getSelection()?.toString(), {
            length: 120,
          })}
        </Container>
        <TextInput
          sx={{
            width: 500,
            borderRadius: 2,
          }}
          placeholder={"书签内容"}
          button
          onClick={(value) => {
            console.log(value);
          }}
        />
      </>
    );
  }

  /** @Description 删除书籍 */
  async function deleteBook(targetBook?: Book) {
    try {
      await Data.remove("bookshelf", { _id: targetBook?._id || book._id });
      await Data.remove("bookBody", { _id: targetBook?._id || book._id });
      loadShelf();
      toast.success(t("delete successfully"));
    } catch (e) {
      toast(e as string);
    }
  }

  return (
    <BookContext.Provider
      value={{
        book,
        modalAddBookmark,
        changeBook,
        updateBook,
        deleteBook,
        nextPage,
        lastPage,
        openBook,
        jumpToPage,
        currentBody,
        modalEditBook,
      }}
    >
      {children as ReactNode}
    </BookContext.Provider>
  );
});

export const useBook = () => useContext(BookContext);
