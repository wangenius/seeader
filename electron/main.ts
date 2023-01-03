import * as path from "path";
import {
  app,
  BrowserWindow,
  dialog,
  Menu,
  nativeImage,
  Notification,
  Tray,
  BrowserWindowConstructorOptions,
} from "electron";
import { ipcListener } from "./ipcListener";
import { ENV } from "this_root";

const WIN32 = process.platform === "win32";
const BrowserConfig: BrowserWindowConstructorOptions = {
  titleBarStyle: "hidden",
  width: 1280,
  height: 760,
  minWidth: 560,
  minHeight: 400,
  icon: path.join(__dirname, "../../public/icon.png"),
  webPreferences: {
    preload: path.join(__dirname, "preload.js"),
    nodeIntegration: true,
    contextIsolation: true,
  },
};

async function createWindow() {
  const mainWindows = new BrowserWindow(BrowserConfig);
  if (app.isPackaged) {
    await mainWindows.loadURL(`file://${__dirname}/../index.html`);
  } else {
    await mainWindows.loadURL("http://localhost:3000/index.html");
    if (ENV.IS_DEV)
      require("electron-reload")(__dirname, {
        electron: path.join(
          __dirname,
          `../../node_modules/.bin/electron${WIN32 ? ".cmd" : ""}`
        ),
        forceHardReset: true,
        hardResetMethod: "exit",
      });
  }

  mainWindows.on("close", (e) => {
    e.preventDefault(); // 阻止退出程序
    new Notification({
      title: "提示",
      body: "窗口最小化至托盘",
      icon: path.join(__dirname, "../../public/icon.png"),
    }).show();
    mainWindows.hide(); // 隐藏主程序窗口
  });

  traySet(mainWindows);
}

app.whenReady().then(async () => {
  await createWindow();

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });

  app.on("window-all-closed", () => {});
  ipcListener();
});

const traySet = (windows: BrowserWindow) => {
  let tray;
  const icon = nativeImage.createFromPath(
    path.join(__dirname, "../../public/icon.png")
  );
  tray = new Tray(icon);
  tray.on("double-click", () => {
    windows.show();
  });
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "打开主界面",
      click: function () {
        windows.show();
        console.log();
      },
    },
    {
      // 点击退出菜单退出程序
      label: "退出",
      click: function () {
        windows.focus();
        dialog
          .showMessageBox(windows, {
            title: "",
            message: "确定退出？",
            noLink: true,
            buttons: ["确定", "取消"],
          })
          .then((res) => {
            if (res.response === 0) {
              windows.destroy();
              app.quit();
            }
          });
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip("seeader");
};
