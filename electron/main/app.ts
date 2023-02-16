import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  dialog,
  Notification,
} from "electron";
import { Dir_statics, path_icon } from "../@constant/path";
import _ from "lodash";

export const currentWindow = () => BrowserWindow.getFocusedWindow();

export abstract class App {
  static async exit(window = currentWindow()) {
    window.focus();
    const res = await dialog.showMessageBox(window, {
      title: "",
      message: "确定退出？",
      noLink: true,
      buttons: ["确定", "取消"],
    });
    if (res.response === 0) {
      window.destroy();
      app.quit();
    }
  }

  static close(win = currentWindow()) {
    win.close();
  }

  static toggleDevTools(win = currentWindow()) {
    win.webContents.isDevToolsOpened()
      ? win.webContents.closeDevTools()
      : win.webContents.openDevTools({ mode: "undocked" });
  }

  static min() {
    currentWindow().minimize();
  }

  static max() {
    currentWindow().maximize();
  }

  static resize() {
    currentWindow().isMaximized()
      ? currentWindow().unmaximize()
      : currentWindow().maximize();
  }

  static async browser(
    url: string,
    BrowserConfig?: BrowserWindowConstructorOptions
  ) {
    const init: BrowserWindowConstructorOptions = {
      icon: Dir_statics.end("icon", "icon.png"),
      autoHideMenuBar: true,
    };
    const newWin = new BrowserWindow(_.defaultsDeep(BrowserConfig, init));
    await newWin.loadURL(url);
  }

  static notice(title, body) {
    new Notification({
      title: title,
      body: body,
      icon: path_icon,
    }).show();
  }

  static open(args) {
    return dialog.showOpenDialog(currentWindow(), args);
  }

  static save(args) {
    return dialog.showSaveDialog(currentWindow(), args);
  }

  static msg(args) {
    return dialog.showMessageBox(currentWindow(), args);
  }
}
