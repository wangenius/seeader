import * as path from "path";
import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Menu,
  nativeImage,
  Notification,
  Tray,
} from "electron";
import autoReload from "electron-reload";
import { appExit } from "./window/Windows";
import { Dir_asar, Dir_statics } from "./@constant/path";
import {
  ipc_datastore,
  ipc_dialog,
  ipc_file,
  ipc_method,
  ipc_win,
} from "./ipc";

const icon_path = Dir_statics.end("icon", "icon.png");

/** @Description 窗口特性 */
const BrowserConfig: BrowserWindowConstructorOptions = {
  titleBarStyle: "hidden",
  width: 560,
  height: 760,
  minWidth: 560,
  minHeight: 660,
  icon: icon_path,
  webPreferences: {
    /*提供预加载接口*/
    preload: path.join(__dirname, "preload.js"),
    nodeIntegration: true,
    contextIsolation: true,
  },
};

/** @Description 创建窗口 */
async function createWindow(): Promise<BrowserWindow> {
  /*创建窗口对象*/
  const mainWindows = new BrowserWindow(BrowserConfig);

  /*链接HTML地址*/
  if (app.isPackaged) await mainWindows.loadURL(Dir_statics.end("index.html"));
  else await mainWindows.loadURL("http://localhost:3000/index.html");

  mainWindows.webContents.openDevTools()
  /*优化启动白屏问题*/
  mainWindows.on("ready-to-show", () => {
    mainWindows.show();
    mainWindows.focus();
  });
  /*关闭最小化至托盘*/
  mainWindows.on("close", (e) => {
    e.preventDefault(); // 阻止退出程序
    new Notification({
      title: "提示",
      body: "窗口最小化至托盘",
      icon: icon_path,
    }).show();
    mainWindows.hide(); // 隐藏主程序窗口
  });

  return mainWindows;
}

/*app完成*/
app.whenReady().then(async () => {
  // 创建窗口
  const mainWindows = await createWindow();
  /*托盘设置*/
  traySet(mainWindows);
  /*handle监听*/
  ipc_method();
  ipc_file();

  ipc_datastore();
  ipc_win();
  ipc_dialog();

  if (!app.isPackaged)
    /*开发环境热加载*/
    autoReload(__dirname, {
      electron: require(Dir_asar.end("node_modules", "electron")),
      hardResetMethod: "exit",
      awaitWriteFinish: true,
      forceHardReset: true,
      /*忽略*/
      ignored: ["**/data/*", "src"],
    });
});

/** @Description 托盘设置 */
function traySet(windows: BrowserWindow) {
  const icon = nativeImage.createFromPath(icon_path);
  const tray = new Tray(icon);
  tray.on("double-click", () => windows.show());
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "打开主界面",
      click: () => windows.show(),
    },
    {
      label: "退出",
      click: () => appExit(windows),
    },
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip("seeader");
}
