import {data} from "@/method/data";
import {dialog} from "@/method/dialog";
import {store} from "@/data/store";
import {shelfSlice} from "@/data/store/shelfSlice";
import {app} from "@/method/app";
import {err} from "@/method/common";

/** @Description 更新store shelf 对象 */
export const _shelf = () => store.getState().shelf;

/** @Description update store */
_shelf.lap = (books: Book[]) => store.dispatch(shelfSlice.actions.lap(books));

/** @Description load  from database */
_shelf.load = () => data("shelf").then(_shelf.lap);

/** @Description export */
_shelf.export = async () => {
    const path = await dialog.save("export.shelf", "shelf", ["shelf"]);
    const {code} = await app("shelf_export", path);
    if (code === 0) err("导出失败");
    return "导出成功";
};

/** @Description import */
_shelf.import = async () => {
    const [path] = await dialog.file("打开书架", "shelf", ["shelf"]);
    const {code, body} = await app("shelf_import", path);
    await _shelf.load();
    if (code === 1) return {msg: `成功导入${body.total}个`};
    if (code === 0) return {
        msg: `共导入${body.total}个，成功${body.success}个，失败${body.fail}个。具体内容查看resources目录下的temp.log日志文件。`
    }
};
