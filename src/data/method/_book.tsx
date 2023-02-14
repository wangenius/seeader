import {data} from "@/method/data";
import {file} from "@/method/file";
import {toast} from "react-toastify";
import {_shelf} from "@/data/method/_shelf";
import i18n from "i18next";
import {bookSlice, initialBook} from "@/data/store/bookSlice";
import {store} from "@/data/store";
import {modal, Pop, TextInput} from "@/component";
import {_chapter} from "@/data";
import {app} from "@/method/app";
import {dialog} from "@/method/dialog";

/** @Description
 *
 * book methods
 *
 * redux book */
export const _book = () => store.getState().book;

/** @Description change redux book state*/
_book.dispatch = (book: Partial<Book>) =>
  store.dispatch(bookSlice.actions.changeBook(book));

_book.close = () => {
  _book.switch([initialBook]);
  _chapter.dispatch();
};

/** @Description change redux book totally*/
_book.switch = (book: Book[]) =>
  store.dispatch(bookSlice.actions.switchBook(book[0]));

_book.dialog_to_add = async () => {
  const [path] = await dialog.file("添加书籍", "txt", ["txt", "epub"]);
  const a = await _book.add(path);
  if (a.code === 0) return toast.error(a.msg);
  await _shelf.load();
  toast.success(i18n.t("add successfully"));
};

/** @Description add book and refresh shelf */
_book.add = (path: string) => app("book_add", path);

/** @description 从数据库中加载书籍信息 */
_book.load = (target: Book = _book()) =>
  data.select<Book>(data().bookshelf, { _id: target._id }).then(_book.switch);

/** @Description open book 1. update current 2. load next */
_book.open = async (book: Book) =>
  await _book.update().then(() => _book.load(book));

/** @Description 不带参数更新当前书籍到db */
_book.update = async (
  id: string = _book()._id,
  targetBook: Partial<Book> = _book()
) =>
  await data
    .update<Book>(data().bookshelf, { _id: id }, targetBook)
    .then(() => _book.load)
    .then(_shelf.load);

_book.delete = async (books: Book[]) => {
  try {
    /** @Description 确认 */
    let msg = `确定删除选中书籍:\n${books.map((item) => item.name + "\n")}`;
    await dialog.confirm(msg);
    /** @Description 以此删除 */
    for await (let item of books) {
      for await (let it of [data().bookshelf, data().bookBody])
        await data.remove(it, { _id: item._id });
      /** @Description 重新加载 */
      await _shelf.load();
    }
    toast.success(i18n.t("delete successfully"));
  } catch {
    console.log("取消了操作");
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
        await _book.update(target._id, { name: value });
        Pop.close();
        modal.close();
        callback!();
      }}
      init={target.name}
    />
  );
};
