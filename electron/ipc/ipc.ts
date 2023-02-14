import { handle } from "./handle";
import {
  app_close,
  window_close,
  window_max,
  window_min,
  window_new,
  window_resize,
  window_toggleDevTools,
} from "./Windows";
import { dict_search } from "./dict";
import {
  file_copy,
  file_write,
  shell_open,
} from "./FileHandler";
import {
  dialog_message,
  dialog_open,
  dialog_save,
  notification,
} from "./dialog";
import {
  db_count,
  db_delete,
  db_find,
  db_insert,
  db_update,
} from "./dataStore";
import { Channels } from "local";
import { json_read, json_write } from "./json";
import {book_add} from "./book";
import {file} from "../method/file";

export function ipc_win() {
  handle(Channels.window_toggleDevTools, window_toggleDevTools);
  handle(Channels.window_min, window_min);
  handle(Channels.window_max, window_max);
  handle(Channels.window_new, window_new);
  handle(Channels.window_resize, window_resize);
  handle(Channels.window_close, window_close);
  handle(Channels.app_close, app_close);
}

export function ipc_method() {
  handle(Channels.dict_search, dict_search);
}

export function ipc_file() {
  handle(Channels.file_write, file_write);
  handle(Channels.file_read, (event, path) => file.read(path));
  handle(Channels.file_copy, file_copy);
  handle(Channels.shell_open, shell_open);
  handle(Channels.json_save, json_write);

}

export function ipc_dialog() {
  handle(Channels.dialog_message, dialog_message);
  handle(Channels.dialog_open, dialog_open);
  handle(Channels.dialog_save, dialog_save);
  handle(Channels.notification, notification);
}

/** @Description 数据库的ipc handle */
export function ipc_datastore() {
  handle(Channels.db_find, db_find);
  handle(Channels.db_insert, db_insert);
  handle(Channels.db_delete, db_delete);
  handle(Channels.db_update, db_update);
  handle(Channels.db_count, db_count);
}


/** @Description  */
export function ipc_code_msg(){
  handle(Channels.book_add,book_add)
}