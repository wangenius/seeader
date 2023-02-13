import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  dialog,
  IpcMainInvokeEvent,
} from "electron";
import { Dir_statics } from "../@constant/path";
import _ from "lodash";

export function currentWindow(event: IpcMainInvokeEvent) {
  return BrowserWindow.fromWebContents(event.sender) as BrowserWindow;
}

export function appExit(window: BrowserWindow) {
  window.focus();
  dialog
    .showMessageBox(window, {
      title: "",
      message: "确定退出？",
      noLink: true,
      buttons: ["确定", "取消"],
    })
    .then((res) => {
      if (res.response === 0) {
        window.destroy();
        app.quit();
      }
    });
}

export const app_close: Motion = (event) => {
  currentWindow(event).destroy();
  app.quit();
};
export const window_toggleDevTools: Motion = (event) => {
  event.sender.isDevToolsOpened()
    ? event.sender.closeDevTools()
    : event.sender.openDevTools({ mode: "undocked" });
};
export const window_min: Motion = (event) => {
  currentWindow(event).minimize();
};
export const window_max: Motion = (event) => {
  currentWindow(event).maximize();
};
export const window_resize: Motion = (event) => {
  const win = currentWindow(event);
  win.isMaximized() ? win.unmaximize() : win.maximize();
};
export const window_new: Motion = async (
  event,
  url: string,
  BrowserConfig?: BrowserWindowConstructorOptions
) => {
  const init: BrowserWindowConstructorOptions = {
    icon: Dir_statics.end("icon", "icon.png"),
    autoHideMenuBar: true,
  };
  const newWin = new BrowserWindow(_.defaultsDeep(BrowserConfig, init));
  await newWin.loadURL(url);
};

export const window_close: Motion = (event) => {
  currentWindow(event).close();
};
