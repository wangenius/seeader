import {_shelf} from "@/method/_shelf";
import {bookSlice, initialBook} from "@/store/bookSlice";
import {store} from "@/store/store";
import {modal, Pop, TextInput} from "@/component";
import React from "react";
import {DavContentPanel} from "@/compace/Panel";
import {_chapter} from "@/method/_chapter";
import {v} from "@/method/v";

/** @Description
 *
 * main methods
 *
 * redux main */
export const _book = () => store.getState().book;

/** @Description change redux main state*/
_book.lap = (book: Partial<Book>) =>
  store.dispatch(bookSlice.actions.lap(book));

/** @Description change redux main totally*/
_book.ban = (book: Book) => store.dispatch(bookSlice.actions.ban(book));

/** @Description close book */
_book.close = () => {
  _book.ban(initialBook);
  _chapter.dispatch();
};

/** @Description add main and refresh shelf */
_book.add = (path?: string) => v.i("book_add", path);

/** @Description select local file to add */
_book.addFromLocal = async () => {
  const res = await _book.add();
  await _shelf.load();
  return res;
};

/** @Description add book from cloud */
_book.addFromCloud = async () => Pop.modal(<DavContentPanel />);

/** @description 从数据库中加载书籍信息 */
_book.load = async (target: Book = _book()) => {
  const [book] = await v.fetchData<Book>("shelf", { _id: target._id });
  _book.ban(book);
  _chapter.load();
};
/** @Description open main 1. update current 2. load next */
_book.open = (book: Book) =>
  v
    .updateData("shelf", { _id: _book()._id }, _book())
    .then(() => _book.load(book));

/** @Description 不带参数更新当前书籍到db */
_book.update = async (
  id: string = _book()._id,
  targetBook: Partial<Book> = _book()
) =>
  await v
    .updateData("shelf", { _id: id }, targetBook)
    .then(() => _book.load())
    .then(_shelf.load);

/** @Description 图书删除 */
_book.delete = async (books: Book[]) => {
  let msg = `确定删除选中书籍:\n${books.map((item) => item.name + "\n")}`;
  const mass = await v.confirm(msg);
  if (mass === undefined) return;
  for await (let item of books)
    await v.i("book_delete", item._id).then(_shelf.load);
  return { code: 1, msg: "删除成功" };
};

/** @Description 备份书籍 */
_book.backupLocal = async (items: Book[]) => {
  return await v.i("book_backup", items);
};

/** @Description 备份书籍Cloud  */
_book.backupCloud = async (books: Book[]) => {
  let paths = books.map((item) => item.path);
  return await v.i("book_upload", paths);
};

/** @Description 编辑 */
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

/** @Description info */
_book.info = async (book: Book) => {
  const mass = await v.confirm(
    `书籍名称: ${book.name}\n书籍id: ${book._id}\n原始路径: ${
      book.path
    }\n总计: ${book.total}章\n当前进度: 第${book.progress + 1}章`,
    ["确定", "打开本地位置"],
    0
  );
  if (mass !== undefined) return v.i("showItemInFolder", book.path);
};
