import {app, BrowserWindow, BrowserWindowConstructorOptions, dialog, Notification,} from "electron";
import {FILE_PATHS} from "../@constant/path";
import _ from "lodash";
import {Detector} from "../main/generator";

/** @Description current window */
export const currentWindow = () => BrowserWindow.getFocusedWindow();

/** @Description app method toolbox */
export abstract class App {
  /** @Description exit app */
  static async exit() {
    const code = await App.confirm("确定退出？");
    if (Detector.ud(code)) return;
    App.close();
    BrowserWindow.getAllWindows().map((item) => item.destroy());
    app.quit();
  }

  /** @Description close window */
  static close(win = currentWindow()) {
    win.close();
  }

  /** @Description toggle devtool */
  static toggleDevTools(contents = currentWindow().webContents) {
    contents.isDevToolsOpened()
      ? contents.closeDevTools()
      : contents.openDevTools({ mode: "undocked" });
  }

  /** @Description minimize */
  static min() {
    currentWindow().minimize();
  }

  /** @Description maximize */
  static max() {
    currentWindow().maximize();
  }

  /** @Description resize */
  static resize() {
    currentWindow().isMaximized()
      ? currentWindow().unmaximize()
      : currentWindow().maximize();
  }

  /** @Description new window */
  static async browser(
    url: string,
    BrowserConfig?: BrowserWindowConstructorOptions
  ) {
    const init: BrowserWindowConstructorOptions = {
      icon: FILE_PATHS.icon,
      autoHideMenuBar: true,
    };
    const newWin = new BrowserWindow(_.defaultsDeep(BrowserConfig, init));
    await newWin.loadURL(url);
  }

  /** @Description notification system */
  static notice(title, body) {
    new Notification({
      title: title,
      body: body,
      icon: FILE_PATHS.icon,
    }).show();
  }

  /** @Description open dialog
   * if cancel : return undefined
   * */
  static async open(
    name: string,
    ext: string[],
    title = "打开文件"
  ): Promise<string> {
    const res = await dialog.showOpenDialog(currentWindow(), {
      title: title,
      filters: [{ name: name, extensions: ext }],
    });
    if (res.canceled) return undefined;
    return res.filePaths[0];
  }

  /** @Description open dialog
   * if cancel : return undefined   * */
  static async directory(title = "选择目录"): Promise<string> {
    const res = await dialog.showOpenDialog(currentWindow(), {
      title: title,
      properties: ["openDirectory"],
    });
    if (res.canceled) return undefined;
    return res.filePaths[0];
  }

  /** @Description save to dialog
   * if cancel : return undefined   * */
  static async save(
    name: string,
    ext: string,
    title: string = "保存到："
  ): Promise<string> {
    const res = await dialog.showSaveDialog(currentWindow(), {
      defaultPath: `${name}.${ext}`,
      filters: [{ name: ext, extensions: [ext] }],
      title: title,
    });
    if (res.canceled) return undefined;
    return res.filePath;
  }

  /** @Description message dialog
   * */
  static async msg(
    message: string,
    buttons: string[] = ["确定"],
    cancelId: number = 0
  ) {
    const res = await dialog.showMessageBox(currentWindow(), {
      title: "提示",
      message: message,
      buttons: buttons,
      noLink: true,
      icon: "./public/icon.ico",
      cancelId: cancelId,
    });
    return res.response;
  }

  /** @Description confirm dialog
   * if cancel : return undefined   *
   * */
  static async confirm(
    message: string,
    buttons: string[] = ["确定", "取消"],
    cancelId: number = 1
  ) {
    const res = await App.msg(message, buttons, cancelId);
    if (res === cancelId) return undefined;
    return res;
  }
}
