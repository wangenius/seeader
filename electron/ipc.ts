import {App} from "./inter/app";
import {db} from "./main/data";
import {Book} from "./inter/book";
import {ipcMain} from "electron";
import {Dav} from "./main/webdav";
import {Shelf} from "./inter/shelf";
import {Channels} from "local";
import {Detector} from "./main/generator";
import {Fima} from "./main/file";
import {Settings} from "./inter/set";

/** @Description listener抛出异常前端不收到异常，其余返回Reply型对象 */
export const handle = (channel: Channels, listener: (...args: any[]) => any) =>
  ipcMain.handle(channel, async (event, ...args) => {
      return listener(...args);
  });

/** @Description 返回前端生成套件 */
export const mass = (msg: string, code: -1 | 0 | 1 = 1, body?: {}) => ({
  msg: msg,
  code: code,
  body: body,
});

mass.cancel = (msg:string ="取消")=>(mass(msg,0))

export function ipc_win() {
  handle("toggleDevtools", App.toggleDevTools);
  handle("minimize", App.min);
  handle("maximize", App.max);
  handle("window_new", App.browser);
  handle("window_resize", App.resize);
  handle("close", App.close);
  handle("exit", App.exit);
  handle("message", App.msg);
  handle("confirm", App.confirm);
  handle("notification", App.notice);
  handle("showItemInFolder", Fima.showItemInFolder);
}

/** @Description  */
export function ipc_data() {
  handle("dict_search", Detector.translate);
  handle("db_find", db.select);
  handle("db_update", db.update);
  handle("book_add", Book.add);
  handle("book_delete", Book.delete);
  handle("book_upload", Book.upload);
  handle("book_backup", Book.backup);
  handle("dav_content", Dav.content);
  handle("dav_download", Book.download);
  handle("shelf_export", Shelf.export);
  handle("shelf_import", Shelf.import);
  handle("sets_save", Settings.save);
  handle("sets_export", Settings.export);
}
