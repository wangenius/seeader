/** @Description CHANNELS */
export const AppConfig = require("../json/appInfo.json");
export const SettingsOptions = require("../json/settingsOptions.json");
export const defaultSettings = require("../json/defaultSettings.json");
export const Style = require("../json/style.json");

export enum Channels {
  window_toggleDevTools = "window_toggleDevTools",
  app_close = "app_close",
  dialog_message = "dialog_message",
  json_read = "json_read",
  json_write = "json_write",
  dialog_open = "dialog_open",
  dialog_save = "dialog_save",
  window_min = "window_min",
  window_max = "window_max",
  window_resize = "window_resize",
  window_close = "window_close",
  window_new = "window_new",
  file_read = "file_read",
  file_copy = "file_copy",
  file_write = "file_write",
  db_find = "db_find",
  db_update = "db_update",
  db_delete = "db_delete",
  db_count = "db_count",
  db_create = "db_create",
  db_insert = "db_insert",
  notification = "notification",
  shell_open = "shell_open",
  dict_search = "dict_search",
}

export enum DataStore {
  bookshelf = "bookshelf",
  bookBody = "bookBody",
}