declare module "a_root" {
  export const ENV: {
    IS_DEV: boolean;
  };
  export const CHANNELS: {
    window_toggleDevTools: "window_toggleDevTools";
    app_close: "app_close";
    dialog_message: "dialog_message";
    dialog_open: "dialog_open";
    dialog_save: "dialog_save";
    window_min: "window_min";
    window_max: "window_max";
    window_resize: "window_resize";
    window_close: "window_close";
    window_new: "window_new";
    file_read: "file_read";
    file_copy: "file_copy";
    file_write: "file_write";
    file_exist: "file_exist";
    db_find: "db_find";
    db_update: "db_update";
    db_delete: "db_delete";
    db_count: "db_count";
    db_create: "db_create";
    db_insert: "db_insert";
    notification: "notification";
    shell_open: "shell_open";
    menu_open: "menu_open";
    dict_search: "dict_search";
  };

  export namespace DataProto {
    type Query = {
      [key: string]: any;
    };
    type RemoveOptions = {
      /**
       * Allows the removal of multiple documents if set to true.
       *
       * Defaults to `false`.
       */
      multi?: boolean;
    };
    type Projection<TSchema> = {
      [p in keyof TSchema]?: number;
    };
    type DBStore = "settings" | "bookshelf" | "bookBody";
  }
}
