declare module "this_root" {
  export const ENV: {
    IS_DEV: boolean;
  };
  export const CHANNELS: {
    window_toggleDevTools: "window_toggleDevTools";
    dialog_message: "dialog_message";
    dialog_open: "dialog_open";
    dialog_save: "dialog_save";
    window_min: "window_min";
    window_max: "window_max";
    window_resize: "window_resize";
    window_close: "window_close";
    file_read: "file_read";
    file_copy: "file_copy";
    file_write: "file_write";
    file_exist: "file_exist";
    db_find: "db_find";
    db_update: "db_update";
    db_delete: "db_delete";
    db_exist: "db_exist";
    db_create: "db_create";
    db_insert: "db_insert";
  };
}
