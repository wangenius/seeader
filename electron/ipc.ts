import { handle } from "./@constant/constant";
import {
  app_close,
  window_close,
  window_max,
  window_min,
  window_new,
  window_resize,
  window_toggleDevTools,
} from "./window/Windows";
import { ipcMain } from "electron";
import { dict_search } from "./other/dict";
import {
  file_copy,
  file_copy_force,
  file_read,
  file_write,
  shell_open,
} from "./file/FileHandler";
import {
  dialog_message,
  dialog_open,
  dialog_save,
  notification,
} from "./dialog/dialog";
import {
  db_count,
  db_delete,
  db_find,
  db_insert,
  db_update,
} from "./dataStore/dataStore";

export function ipc_win() {
  handle("window_toggleDevTools", window_toggleDevTools);
  handle("window_min", window_min);
  handle("window_max", window_max);
  handle("window_new", window_new);
  handle("window_resize", window_resize);
  handle("window_close", window_close);
  handle("app_close", app_close);
}

export function ipc_method() {
  ipcMain.handle("dict_search", dict_search);
}

export function ipc_file() {
  handle("file_write", file_write);
  handle("file_read", file_read);
  handle("file_copy", file_copy);
  handle("file_copy_force", file_copy_force);
  handle("shell_open", shell_open);
}

export function ipc_dialog() {
  handle("dialog_message", dialog_message);
  handle("dialog_open", dialog_open);
  handle("dialog_save", dialog_save);
  handle("notification", notification);
}

/** @Description 数据库的ipc handle */
export function ipc_datastore() {
  handle("db_insert", db_insert);
  handle("db_delete", db_delete);
  handle("db_find", db_find);
  handle("db_update", db_update);
  handle("db_count", db_count);
}
