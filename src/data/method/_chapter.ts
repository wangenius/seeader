import {store} from "@/data/store";
import {chapterSlice} from "@/data/store/chapterSlice";
import {data} from "@/method/data";
import {DataStore} from "a_root";
import {toast} from "react-toastify";
import {bookSlice} from "@/data/store/bookSlice";
import {_book} from "@/data/method/_book";

/** @Description 返回当前章节index  number*/
export const _chapter = () => store.getState().book.progress;

/** @Description change store */
_chapter.patch = (chapters: string[]) => {
  store.dispatch(chapterSlice.actions.change(chapters));
};

/** @Description load new chapter and parser */
_chapter.load = () => {
  /** @Description loading */
  _chapter.patch([]);
  /** @Description 选择 */
  data
    .select<Chapters>(
      DataStore.bookBody,
      { _id: _book()._id },
      { [_book().progress]: 1 }
    )
    .then((res) => {
      /** @Description 解析 */
      if (!res.length) return _chapter.patch([""]);
      const result = _chapter.parser(res[0][_book().progress]?.content);
      _chapter.patch(result);
    });
};

/** @Description chapter to  */
_chapter.to = (index: number) => _book.dispatch({ progress: index });

/** @Description turn next chapter */
_chapter.next = () => {
  if (_book().progress >= _book().total - 1) return toast.warning("最后一章了");
  store.dispatch(bookSlice.actions.nextProgress());
};

/** @Description turn last page */
_chapter.last = () => {
  if (_book().progress <= 0) return toast.warning("前面没有了");
  store.dispatch(bookSlice.actions.lastProgress());
};

/** @Description chapter parser */
_chapter.parser = (text: string) => {
  let result: string[] = [],
    temp;
  text.split(/\r\n|\n/).map((item: string) => {
    temp = item
      .replace(/(^\s+)|(\s+$)/g, "") //取消空格
      .replace(/\s/g, "");
    result.push(temp);
  });
  return result;
};
