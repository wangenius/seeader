import Electron, { MenuItem, MenuItemConstructorOptions } from "electron";
import { CHANNELS, DataProto } from "a_root";
import { err } from "./general";
import __ from "lodash";

export namespace FileInter {
  export const save = (path: string, content: string) =>
    window.invoke(CHANNELS.file_write, path, content);
  export const read = (path: string): Promise<string> =>
    window.invoke(CHANNELS.file_read, path);
  export const copy = (path: string, target: string) =>
    window.invoke(CHANNELS.file_copy, path, target);
}

export namespace Browser {
  export const create = (url: string) => {
    return window.invoke(CHANNELS.window_new, url);
  };
}

export namespace Dialog {
  export const message = (message: string = "暂无信息") =>
    window.invoke(CHANNELS.dialog_message, {
      title: "提示",
      message: message,
      noLink: true,
      icon: "./public/icon.ico",
    });

  export const confirm = (message: string) =>
    window
      .invoke(CHANNELS.dialog_message, {
        title: "提示",
        message: message,
        buttons: ["确定", "取消"],
        noLink: true,
        icon: "./public/icon.ico",
      })
      .then((res) => {
        if (res.response !== 0) throw "取消";
        return true;
      });

  type FilePath = string;

  export const select = (
    args: Electron.OpenDialogOptions
  ): Promise<FilePath[]> =>
    window
      .invoke(CHANNELS.dialog_open, args)
      .then((res: Electron.OpenDialogReturnValue) => {
        if (res.canceled) err("取消选择");
        return res.filePaths;
      });

  export const save = (
    defaultPath: string,
    message: string = "保存到..."
  ): Promise<Electron.SaveDialogReturnValue> =>
    window.invoke(CHANNELS.dialog_save, {
      title: message,
      defaultPath: defaultPath,
    });

  export const directory = (): Promise<Electron.OpenDialogReturnValue> =>
    window.invoke(CHANNELS.dialog_open, {
      message: "选择目录：",
      properties: ["openDirectory"],
    });
}
export const remote = window.invoke;
export const shell = window.shell;

export namespace WinMenu {
  export const open = (
    template: Array<MenuItemConstructorOptions | MenuItem>
  ) => {
    return window.invoke(CHANNELS.menu_open, template);
  };
}

export namespace Shell {
  export const openFile = (relativePath: string) =>
    window.invoke(CHANNELS.shell_open, relativePath);

  export const dict = (word: string) =>
    window.invoke(
      CHANNELS.dict_search,
      __.lowerCase(word),
      "public/mdx/zh.mdx"
    );
}

export namespace Clipboard {
  export const copy = (text: string) => window.clipboard.writeText(text);
  export const read = () => window.clipboard.readText();
}

export namespace Data {
  export const insert = async <T = any>(
    datastore: DataProto.DBStore,
    query: DataProto.Query
  ): Promise<T> => window.invoke(CHANNELS.db_insert, datastore, query);
  export const remove = async <T = any>(
    datastore: DataProto.DBStore,
    query: DataProto.Query
  ): Promise<T[]> => window.invoke(CHANNELS.db_delete, datastore, query);
  export const update = async <T = any>(
    datastore: DataProto.DBStore,
    before: Partial<T>,
    after: Partial<T>
  ): Promise<T[]> =>
    window.invoke(CHANNELS.db_update, datastore, before, { $set: after });
  export const select = async <T = any>(
    datastore: DataProto.DBStore,
    query: DataProto.Query,
    projection?: DataProto.Projection<any>
  ): Promise<T[]> =>
    window.invoke(CHANNELS.db_find, datastore, query, projection);
}

export const notification = (body: string, title: string = "提示") =>
  window.invoke(CHANNELS.notification, title, body);
