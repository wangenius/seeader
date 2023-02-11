import {DataStore, Path} from "a_root";
import {dialog, err} from "@/method";
import {data} from "@/method/data";
import {file} from "@/method/file";
import {toast} from "react-toastify";
import {_shelf} from "@/data/method/_shelf";
import i18n from "i18next";
import {bookSlice} from "@/data/store/bookSlice";
import {store} from "@/data/store";
import {modal, Pop, TextInput} from "@/component";
import _ from "lodash";
import {textToBook} from "@/method/parser";

/** @Description
 *
 * book methods
 *
 * redux book */
export const _book = () => store.getState().book;

_book.dispatch = (book: Partial<Book>) =>
  store.dispatch(bookSlice.actions.changeBook(book));

_book.switch = (book: Book) =>
  store.dispatch(bookSlice.actions.switchBook(book));

_book.add = async () => {
  const [path] = await dialog.file({
    title: "添加书籍",
    filters: [{ name: "txt", extensions: ["txt", "epub"] }],
  });
  await _book.insert(path);
  await _shelf.load();
  toast.success(i18n.t("add successfully"));
};

/** @Description 将path的文件解析为可读取数据库对象并插入 */
_book.insert = async (path: string) => {
  /*判断中含有该书*/
  const res = await data.select(DataStore.bookshelf, { path: path });
  res.length && err(`已经添加过该书籍《${Path.parser(path).name}》`);
  /*解析书籍*/
  const { Chapters, total, titles } = await textToBook(path);
  /*保存body数据库*/
  const { _id } = await data.insert<Chapters>(DataStore.bookBody, Chapters);
  const book: Book = {
    _id: _id,
    name: Path.parser(path).name,
    path: path,
    total: total,
    progress: 0,
    titles: titles,
  };
  await data.insert<Book>(DataStore.bookshelf, book);
};

/** @description 从数据库中加载书籍信息 */
_book.load = (target: Book) =>
  data
    .select<Book>(DataStore.bookshelf, {
      _id: target._id,
    })
    .then((res) => _book.switch(res[0]));

_book.open = async (book: Book) => {
  /** @Description 更新当前书籍ds信息 */
  await _book.update();
  /** @Description 加载目标书籍 */
  await _book.load(book);
};

_book.update = async (targetBook?: Book, id?: string) => {
  await data.update<Book>(
    DataStore.bookshelf,
    { _id: id || targetBook?._id || _book()._id },
    targetBook || _book()
  );
  await _book.load(_book());
  await _shelf.load();
};

_book.delete = async (books: Book[]) => {
  try {
    /** @Description 确认 */
    await dialog.confirm(
        `确定删除选中书籍:\n${books.map((item) => item.name + "\n")}`
    );
    /** @Description 以此删除 */
    for await (let item of books) {
      await data.remove(DataStore.bookshelf, {
        _id: item._id,
      });
      await data.remove(DataStore.bookBody, {
        _id: item._id,
      });
      /** @Description 重新加载 */
      _shelf.load();
    }
    toast.success(i18n.t("delete successfully"));
  }
  catch {
    console.log("取消了操作")
  }

};
/** @Description 备份书籍 */
_book.backup = async (items: Book[]) => {
  try {
    /*选择目录地址*/
    const [path] = await dialog.directory();
    let result = {
      success: 0,
      fail: 0,
    };
    /*顺序复制书籍到置顶目录*/
    for (const item of items) {
      const a = await file.copy(item.path, `${path}\\${item.name}.txt`);
      if (a) result.success++;
      else {
        result.fail++;
        toast.error(`已存在同名文件${item.name}`);
      }
    }

    toast.info(
      `共导出${items.length}个 ,成功${result.success}个,失败${result.fail}个`
    );
  } catch (e) {
    toast.error(e as string);
  }
};

_book.edit = (target: Book, callback?: Fn) => {
  Pop.modal(
    <TextInput
      button
      onClick={async (value) => {
        await _book.update(_.defaultsDeep({ name: value }, target), target._id);
        Pop.close();
        modal.close();
        callback!();
      }}
      init={target.name}
    />
  );
};
