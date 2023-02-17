import {store} from "@/store/store";
import {chapterSlice} from "@/store/chapterSlice";
import {toast} from "react-toastify";
import {bookSlice} from "@/store/bookSlice";
import {_book} from "@/method/_book";
import {v} from "@/method/v";


/** @Description 返回当前章节index  number*/
export const _chapter = () => store.getState().book.progress;

/** @Description change store */
_chapter.dispatch = (chapters: string[] = []) =>
  store.dispatch(chapterSlice.actions.change(chapters));

/** @Description load new chapter and parser */
_chapter.load = () => {
  /** @Description loading */
  _chapter.dispatch();
  /** @Description 选择 */
  v.fetchData<Chapter>(_book()._id, { index: _book().progress })
    .then((res) => {
      if (!res.length) return _chapter.dispatch();
      _chapter.dispatch(res[0]?.content);
    });
};

/** @Description chapter to  */
_chapter.to = (index: number) => {
  _book.lap({ progress: index });
  _chapter.load();
};

/** @Description turn next chapter */
_chapter.next = () => {
  if (_book().progress >= _book().total - 1) return toast.warning("最后一章了");
  store.dispatch(bookSlice.actions.nextProgress());
  _chapter.load();
};

/** @Description turn last page */
_chapter.last = () => {
  if (_book().progress <= 0) return toast.warning("前面没有了");
  store.dispatch(bookSlice.actions.lastProgress());
  _chapter.load();
};
