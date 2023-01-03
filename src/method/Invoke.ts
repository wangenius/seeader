import Electron from "electron";
import { CHANNELS } from "this_root";

export namespace FileInter {
  export const save = (path: string, content: string) =>
    window.invoke(CHANNELS.file_write, path, content);
  export const read = (path: string): Promise<Buffer> =>
    window.invoke(CHANNELS.file_read, path);
  export const copy = (path: string, target: string) =>
    window.invoke(CHANNELS.file_copy, path, target);
  export const exist = (path: string) =>
    window.invoke(CHANNELS.file_exist, path);
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
        if (res.response !== 0) throw "cancel";
        else return true;
      });

  export const select = (
    args: Electron.OpenDialogOptions
  ): Promise<Electron.OpenDialogReturnValue> =>
    window.invoke(CHANNELS.dialog_open, args);

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
export const invoke = window.invoke;

export namespace Clipboard {
  export const copy = (text: string) => window.clipboard.writeText(text);
  export const read = () => window.clipboard.readText();
}
