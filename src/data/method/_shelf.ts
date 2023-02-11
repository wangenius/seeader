import {data} from "@/method/data";
import {DataStore} from "a_root";
import {dialog} from "@/method/dialog";
import { err, file, json} from "@/method";
import {toast} from "react-toastify";
import {store} from "@/data/store";
import {shelfSlice} from "@/data/store/shelfSlice";
import {_book} from "@/data";

/** @Description 更新store shelf 对象 */
export const _shelf = () => store.getState().shelf;

/** @Description update store */
_shelf.patch = (books: Book[]) => {
  store.dispatch(shelfSlice.actions.change(books));
};
/** @Description load  from database */
_shelf.load = () => {
  data.select<Book>(DataStore.bookshelf).then(_shelf.patch);
};

/** @Description export */
_shelf.export = async () => {
  try {
    const path = await dialog.save("index.bookshelf");
    await file.save(path, JSON.stringify(_shelf()));
    toast.success("导出成功");
  } catch (e) {
    toast.error(e as string);
  }
};

/** @Description import */
_shelf.import = async () => {
  try {
    /*选择书架文件*/
    const res = await dialog.file({
      title: "打开书架",
      filters: [{ name: "bookshelf", extensions: ["bookshelf"] }],
    });
    /*解析书架文件*/
    const shelf = json.parser<Shelf>(await file(res[0]), {
      books: [],
    });
    /*判断文件格式*/
    !shelf && err("文件内容错误");
    /*循环解析书架书籍*/
    for (let book of shelf!.books) {
      await _book.insert(book.path);
      _shelf.load();
    }
    toast.success("导入成功");
  } catch (e) {
    toast.error(e as string);
  }
};
