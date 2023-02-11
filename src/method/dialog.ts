import { Channels } from "a_root";
import Electron from "electron";
import { err, invoke } from "@/method/index";

export const dialog = (message: string = "暂无信息") =>
  invoke(Channels.dialog_message, {
    title: "提示",
    message: message,
    noLink: true,
    icon: "./public/icon.ico",
  });

dialog.confirm = (message: string = "确认？"): Promise<true> =>
  invoke(Channels.dialog_message, {
    title: "提示",
    message: message,
    buttons: ["取消", "确定"],
    noLink: true,
    icon: "./public/icon.ico",
  }).then((res) => {
    res.response !== 1 && err("取消");
    return true;
  });

/** @Description 选择文件 返回promise file path string[]*/
dialog.file = (args: Electron.OpenDialogOptions): Promise<string[]> =>
  invoke(Channels.dialog_open, args).then((res) => {
    res.canceled && err("取消选择");
    return res.filePaths;
  });

/** @Description 选择目录 */
dialog.directory = (): Promise<string[]> =>
  invoke(Channels.dialog_open, {
    message: "选择目录：",
    properties: ["openDirectory"],
  }).then((res) => {
    res.canceled && err("已取消导出");
    return res.filePaths;
  });

/** @Description 保存文件到 返回保存地址 */
dialog.save = (
  defaultPath: string,
  message: string = "保存到..."
): Promise<string> =>
  invoke(Channels.dialog_save, {
    title: message,
    defaultPath: defaultPath,
  }).then((res) => {
    res.canceled && err("取消保存");
    return res.filePath;
  });

/** @Description 系统通知 */
dialog.notification = (body: string, title: string = "提示") =>
  invoke(Channels.notification, title, body);
