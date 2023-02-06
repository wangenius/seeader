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
import { CHANNELS } from "a_root";

export function ipc_win() {
  handle(CHANNELS.window_toggleDevTools, window_toggleDevTools);
  handle(CHANNELS.window_min, window_min);
  handle(CHANNELS.window_max, window_max);
  handle(CHANNELS.window_new, window_new);
  handle(CHANNELS.window_resize, window_resize);
  handle(CHANNELS.window_close, window_close);
  handle(CHANNELS.app_close, app_close);
}

export function ipc_method() {
  handle(CHANNELS.dict_search, dict_search);
}

export function ipc_file() {
  handle(CHANNELS.file_write, file_write);
  handle(CHANNELS.file_read, file_read);
  handle(CHANNELS.file_copy, file_copy);
  handle(CHANNELS.file_copy_force, file_copy_force);
  handle(CHANNELS.shell_open, shell_open);
}

export function ipc_dialog() {
  handle(CHANNELS.dialog_message, dialog_message);
  handle(CHANNELS.dialog_open, dialog_open);
  handle(CHANNELS.dialog_save, dialog_save);
  handle(CHANNELS.notification, notification);
}

/** @Description 数据库的ipc handle */
export function ipc_datastore() {
  handle(CHANNELS.db_insert, db_insert);
  handle(CHANNELS.db_delete, db_delete);
  handle(CHANNELS.db_find, db_find);
  handle(CHANNELS.db_update, db_update);
  handle(CHANNELS.db_count, db_count);
}

export function ipc_epub(){

}