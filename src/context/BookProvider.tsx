import React, {memo, ReactNode, useContext, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/store";
import {useShelf} from "./ShelfProvider";
import {useNav} from "../hook/useNav";
import {bookStore} from "../store/bookStore";
import {Card, Pop, TextInput} from "../component";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {Data} from "../method";
import {DataStore} from "a_root";

// @ts-ignore
const BookContext = React.createContext<BookContextProps>({});

export const BookProvider = memo(({ children }: Props.Base) => {
  const book = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();
  const { loadShelf } = useShelf();
  const [currentBody, setCurrentBody] = useState<string[]>([]);
  const { t } = useTranslation();
  const { toReading } = useNav();

  /** 当book改变时，重新加载章节内容 */
  useEffect(loadChapterBody, [book, book.progress]);

  /** @Description 更改当前书籍信息 */
  const changeBook = async (book: Partial<Book>) =>
    dispatch(bookStore.actions.changeBook(book));

  /** @Description 跳转章节 */
  async function jumpToPage(index: number) {
    setCurrentBody([]);
    await changeBook({ progress: index });
  }

  function nextPage() {
    setCurrentBody([]);
    dispatch(bookStore.actions.nextProgress());
  }

  function lastPage() {
    setCurrentBody([]);
    dispatch(bookStore.actions.lastProgress());
  }

  /** @description 从数据库中加载书籍信息 */
  async function loadBook(target?: Book) {
    const res = await Data.select<Book>(DataStore.bookshelf, {
      _id: target?._id || book._id,
    });
    await dispatch(bookStore.actions.switchBook(res[0]));
  }

  /** @Description 打开书籍(1.更新当前书数据库信息 2.加载目标书籍) */
  async function openBook(target: Book) {
    await updateBook();
    await loadBook(target);
    toReading();
  }

  /** @Description 加载书籍正文内容 */
  function loadChapterBody() {
    Data.select<BookBodies>(
      DataStore.bookBody,
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
      .catch(() => {
        toast.error("load error");
      });
  }

  /** @Description 更新当前数据库信息 无参数时更新当前书籍信息，一个参数时更新目标书籍信息（参数内含有_id），两个参数时更新_id=id的对象信息 */
  async function updateBook(targetBook?: Partial<Book>, id?: string) {
    await Data.update<Book>(
      DataStore.bookshelf,
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
    Pop.modal(
      <Card style={{ width: 500, height: 300 }}>
        <TextInput
          button
          onClick={async (value) => {
            await editBook({ name: value }, target);
            Pop.close();
          }}
          init={target?.name || book.name}
        />
      </Card>
    );
  }

  /** @Description 删除书籍 */
  async function deleteBook(targetBook?: Book) {
    try {
      await Data.remove(DataStore.bookshelf, {
        _id: targetBook?._id || book._id,
      });
      await Data.remove(DataStore.bookBody, {
        _id: targetBook?._id || book._id,
      });
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
