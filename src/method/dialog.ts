import Electron from "electron";
import { err } from "./general";
import { remote } from "./remote";

export abstract class Dialog {
  static message = (message: string = "暂无信息") =>
    remote("dialog_message", {
      title: "提示",
      message: message,
      noLink: true,
      icon: "./public/icon.ico",
    });

  static confirm = (message: string) =>
    remote("dialog_message", {
      title: "提示",
      message: message,
      buttons: ["确定", "取消"],
      noLink: true,
      icon: "./public/icon.ico",
    }).then((res) => {
      if (res.response !== 0) throw "取消";
      return true;
    });

  static select = (args: Electron.OpenDialogOptions): Promise<string[]> =>
    remote("dialog_open", args).then((res: Electron.OpenDialogReturnValue) => {
      if (res.canceled) err("取消选择");
      return res.filePaths;
    });

  static save = (
    defaultPath: string,
    message: string = "保存到..."
  ): Promise<Electron.SaveDialogReturnValue> =>
    remote("dialog_save", {
      title: message,
      defaultPath: defaultPath,
    });

  static directory = (): Promise<Electron.OpenDialogReturnValue> =>
    remote("dialog_open", {
      message: "选择目录：",
      properties: ["openDirectory"],
    });

  static notification = (body: string, title: string = "提示") =>
    remote("notification", title, body);
}
