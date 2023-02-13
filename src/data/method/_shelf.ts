import {data} from "@/method/data";
import {dialog} from "@/method/dialog";
import {toast} from "react-toastify";
import {store} from "@/data/store";
import {shelfSlice} from "@/data/store/shelfSlice";
import {_book} from "@/data";
import {file} from "@/method/file";

/** @Description 更新store shelf 对象 */
export const _shelf = () => store.getState().shelf;

/** @Description update store */
_shelf.patch = (books: Book[]) =>
  store.dispatch(shelfSlice.actions.change(books));

/** @Description load  from database */
_shelf.load = () => data.select<Book>(data().bookshelf).then(_shelf.patch);

/** @Description export */
_shelf.export = async () => {
  try {
    const path = await dialog.save("bookshelf.json");
    await file.save(path, JSON.stringify(_shelf()));
    toast.success("导出成功");
  } catch (e) {
    toast.error(e as string);
  }
};

/** @Description import */
_shelf.import = async () => {
  try {
    const [path] = await dialog.file("打开书架", "json", ["json"]);
    const shelf = file.json_read<Shelf>(path);
    for (let book of shelf.books) await _book.add(book.path);
    toast.success("导入成功");
  } catch (e) {
    toast.error(e as string);
  }
};