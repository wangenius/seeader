import { App } from "./main/app";
import { Dastore } from "./main/data";
import { Book } from "./main/book";
import { ipcMain } from "electron";
import { Dav } from "./main/webdav";
import { Shelf } from "./main/shelf";
import { Channels } from "local";
import { Detector } from "./main/generator";
import { Fima } from "./main/file";
import { Settings } from "./main/set";

export const handle = (channel: Channels, listener: (...args: any[]) => any) =>
  ipcMain.handle(channel, (event, ...args) => {
    return listener(...args);
  });

export function ipc_win() {
  handle("window_toggleDevTools", App.toggleDevTools);
  handle("window_min", App.min);
  handle("window_max", App.max);
  handle("window_new", App.browser);
  handle("window_resize", App.resize);
  handle("window_close", App.close);
  handle("app_exit", App.exit);
  handle("dialog_message", App.msg);
  handle("dialog_open", App.open);
  handle("dialog_save", App.save);
  handle("notification", App.notice);
}

export function ipc_method() {
  handle("dict_search", Detector.translate);
  handle("showItemInFolder", Fima.showItemInFolder);
}

/** @Description 数据库的ipc handle */
export function ipc_datastore() {
  handle("db_find", Dastore.select);
  handle("db_update", Dastore.update);
}

/** @Description  */
export function ipc_obj() {
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
