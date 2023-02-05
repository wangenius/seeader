import Electron from "electron";
import { err } from "./general";
import { remote } from "./remote";

/** @Description 对话框类 */
export abstract class Dialog {
    /** @Description 提示信息 */
  static message = (message: string = "暂无信息") =>
    remote("dialog_message", {
      title: "提示",
      message: message,
      noLink: true,
      icon: "./public/icon.ico",
    });

  /** @Description 确认弹窗 取消则抛出异常 返回promise true*/
  static confirm = (message: string = "确认？") =>
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

  /** @Description 选择文件 返回promise file path string[]*/
  static select = (args: Electron.OpenDialogOptions): Promise<string[]> =>
    remote("dialog_open", args).then((res: Electron.OpenDialogReturnValue) => {
      if (res.canceled) err("取消选择");
      return res.filePaths;
    });

  /** @Description 保存文件到 返回保存地址 */
  static save = (
    defaultPath: string,
    message: string = "保存到..."
  ): Promise<Electron.SaveDialogReturnValue> =>
    remote("dialog_save", {
      title: message,
      defaultPath: defaultPath,
    });

  /** @Description 选择目录 */
  static directory = (): Promise<Electron.OpenDialogReturnValue> =>
    remote("dialog_open", {
      message: "选择目录：",
      properties: ["openDirectory"],
    });

  /** @Description 系统通知 */
  static notification = (body: string, title: string = "提示") =>
    remote("notification", title, body);
}
