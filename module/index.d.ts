declare module "a_root" {
  export const ENV: {
    IS_DEV: boolean;
  };
  export type CHANNELS =
    | "window_toggleDevTools"
    | "app_close"
    | "dialog_message"
    | "dialog_open"
    | "dialog_save"
    | "window_min"
    | "window_max"
    | "window_resize"
    | "window_close"
    | "window_new"
    | "file_read"
    | "file_copy"
    | "file_copy_force"
    | "file_write"
    | "db_find"
    | "db_update"
    | "db_delete"
    | "db_count"
    | "db_create"
    | "db_insert"
    | "notification"
    | "shell_open"
    | "dict_search";

  export type Query = {
    [key: string]: any;
  };

  export type RemoveOptions = {
    multi?: boolean;
  };
  export type Projection<TSchema> = {
    [p in keyof TSchema]?: number;
  };
  export type DataStore = "settings" | "bookshelf" | "bookBody";
}
