declare module "a_root" {
    export = $
}

declare namespace $ {

    export type Query = {
        [key: string]: any;
    };

    export enum CHANNELS {
        window_toggleDevTools = "window_toggleDevTools",
        app_close = "app_close",
        dialog_message = "dialog_message",
        dialog_open = "dialog_open",
        dialog_save = "dialog_save",
        window_min = "window_min",
        window_max = "window_max",
        window_resize = "window_resize",
        window_close = "window_close",
        window_new = "window_new",
        file_read = "file_read",
        file_copy = "file_copy",
        file_copy_force = "file_copy_force",
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

    export type RemoveOptions = {
        multi?: boolean;
    };

    export type Projection<TSchema> = {
        [p in keyof TSchema]?: number;
    };

    export enum DataStore {
        settings = "settings",
        bookshelf = "bookshelf",
        bookBody = "bookBody",
    }

    export enum Extension {
        database = ".db",
    }
}


