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
import {App} from "./main/app";
import {Dir_asar, Dir_resources, Dir_statics, isPackaged, path_icon,} from "./@constant/path";
import {
  ipc_obj,
  ipc_datastore,
  ipc_method,
  ipc_win,
} from "./ipc";
import fs from "fs/promises";
import {config, SETTINGS} from "local";

/** @Description 窗口特性 */
const BrowserConfig: BrowserWindowConstructorOptions = {
  titleBarStyle: "hidden",
  width: 1080,
  height: 760,
  minWidth: 560,
  minHeight: 660,
  icon: path_icon,
  // show:false,
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
      icon: path_icon,
    }).show();
    mainWindows.hide(); // 隐藏主程序窗口
  });

  // mainWindows.webContents.openDevTools()
  return mainWindows;
}

/** @Description  */
function initialSet() {
  /** @Description 设置可更改config文件夹 */
  const dir = Dir_resources.enter("config");
  fs.access(dir.path).catch(() => fs.mkdir(dir.path));

  /** @Description 创建初始设置项参数 */
  fs.access(dir.end("settings.json")).catch(() => {
    return fs.writeFile(
      dir.end("settings.json"),
      JSON.stringify(SETTINGS)
    );
  });
  /** @Description 创建初始设置项参数 */
  fs.access(dir.end("account.json")).catch(() => {
    return fs.writeFile(
      dir.end("account.json"),
      JSON.stringify({
        webdav:{
          url:"https://dav.jianguoyun.com/dav/",
          account:"wangenius@qq.com",
          password:"am48t7v9a5ac6wan"
        }
      })
    );
  });
}

/*app完成*/
app.whenReady().then(async () => {
  initialSet();
  ipc_obj();
  ipc_datastore();
  ipc_method();
  ipc_win();
  // 创建窗口
  const mainWindows = await createWindow();
  traySet(mainWindows);

  /*托盘设置*/

  if (!isPackaged)
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
  const icon = nativeImage.createFromPath(path_icon);
  const tray = new Tray(icon);
  tray.on("double-click", () => windows.show());
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "打开主界面",
      click: () => windows.show(),
    },
    {
      label: "退出",
      click: () => App.exit(windows),
    },
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip(isPackaged ? config.name : "dev");
}
