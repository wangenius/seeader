import {data} from "@/method/data";
import {_shelf} from "@/data/method/_shelf";
import {bookSlice, initialBook} from "@/data/store/bookSlice";
import {store} from "@/data/store";
import {modal, Pop, TextInput} from "@/component";
import {app} from "@/method/app";
import {dialog} from "@/method/dialog";
import {err} from "@/method/common";
import React from "react";
import {DavContentPanel} from "@/compace/Panel";
import {_chapter} from "@/data/method/_chapter";

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
_book.ban = (book: Book[]) => store.dispatch(bookSlice.actions.ban(book[0]));

/** @Description close book */
_book.close = () => {
  _book.ban([initialBook]);
  _chapter.dispatch();
};

/** @Description add main and refresh shelf */
_book.add = (path: string) => app("book_add", path);

/** @Description select local file to add */
_book.addFromLocal = async () => {
  const [path] = await dialog.file("添加书籍", "txt", ["txt", "epub"]);
  const { code, msg } = await _book.add(path);
  code === 0 && err(msg);
  await _shelf.load();
  return { msg: "添加成功" };
};

/** @Description add book from cloud */
_book.addFromCloud = async () => Pop.modal(<DavContentPanel />);

/** @description 从数据库中加载书籍信息 */
_book.load = (target: Book = _book()) =>
  data<Book>("shelf", { _id: target._id }).then(_book.ban).then(_chapter.load);

/** @Description open main 1. update current 2. load next */
_book.open = (book: Book) =>
  data
    .update("shelf", { _id: _book()._id }, _book())
    .then(() => _book.load(book));

/** @Description 不带参数更新当前书籍到db */
_book.update = async (
  id: string = _book()._id,
  targetBook: Partial<Book> = _book()
) =>
  await data
    .update("shelf", { _id: id }, targetBook)
    .then(() => _book.load())
    .then(_shelf.load);

/** @Description 图书删除 */
_book.delete = async (books: Book[]) => {
  let msg = `确定删除选中书籍:\n${books.map((item) => item.name + "\n")}`;
  await dialog.confirm(msg);
  for await (let item of books)
    await app("book_delete", item._id).then(_shelf.load);
  return { msg: "删除成功" };
};

/** @Description 备份书籍 */
_book.backupLocal = async (items: Book[]) => {
  const [path] = await dialog.directory();
  const { code, msg } = await app("book_backup", path, items);
  code === 0 && err("false");
  return { msg };
};

/** @Description 备份书籍Cloud  */
_book.backupCloud = async (books: Book[]) => {
  let msg = `确定上传选中书籍:\n${books.map((item) => item.name + "\n")}`;
  await dialog.confirm(msg);
  let paths = books.map((item) => item.path);
  const res = await app("book_upload", paths);
  if (res.code !== 1) err("上传失败");
  return res;
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
_book.info = (book: Book) =>
  app("dialog_message", {
    title: "提示",
    message: `书籍名称: ${book.name}\n书籍id: ${book._id}\n原始路径: ${
      book.path
    }\n总计: ${book.total}章\n当前进度: 第${book.progress + 1}章`,
    noLink: true,
    buttons: ["确定", "打开本地位置"],
    cancelId: 0,
    icon: "./public/icon.ico",
  }).then((res) => {
    if (res.response === 1) return app("showItemInFolder", book.path);
  });
