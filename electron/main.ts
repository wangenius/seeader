import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Menu,
  nativeImage,
  Tray,
} from "electron";
import autoReload from "electron-reload";
import {App} from "./inter/app";
import {DIRS, FILE_PATHS, PARAMS} from "./@constant/path";
import {ipc_data, ipc_win} from "./ipc";
import {config, SETTINGS} from "local";
import {Fima} from "./main/file";
import {Shelf} from "./inter/shelf";

/** @Description 窗口特性 */
const BrowserConfig: BrowserWindowConstructorOptions = {
  titleBarStyle: "hidden",
  width: 1080,
  height: 760,
  minWidth: 560,
  minHeight: 660,
  icon: FILE_PATHS.icon,

  webPreferences: {
    preload: FILE_PATHS.preload,
    nodeIntegration: true,
  },
};

/** @Description 创建窗口 */
async function createWindow(): Promise<BrowserWindow> {
  const mainWindows = new BrowserWindow(BrowserConfig);
  if (app.isPackaged) await mainWindows.loadURL(FILE_PATHS.indexHTML);
  else await mainWindows.loadURL("http://localhost:3000/index.html");
  mainWindows.on("ready-to-show", () => {
    mainWindows.show();
    mainWindows.focus();
  });
  mainWindows.on("close", (e) => {
    e.preventDefault();
    mainWindows.hide();
  });
  return mainWindows;
}

/** @Description 初始化 */
async function initialSet() {
  /** @Description 初始化写入json文件 */
  await Fima.write_json(FILE_PATHS.config.settings, SETTINGS, false);
}

/** @Description 托盘设置 */
function traySet(windows: BrowserWindow) {
  const icon = nativeImage.createFromPath(FILE_PATHS.icon);
  const tray = new Tray(icon);
  tray.on("double-click", () => windows.show());
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "打开主界面",
      click: () => windows.show(),
    },
    {
      label: "导出书架",
      click: () => {
        Shelf.export().then((res) => {
          if (res.code ===1)
          App.notice("提示", "导出成功");
        });
      },
    },
    {
      label: "退出",
      click: () => App.exit(),
    },
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip(PARAMS.isPackaged ? config.name : "dev");
}

/** app ready */
app.whenReady().then(async () => {
  await initialSet();
  ipc_data();
  ipc_win();
  // 创建窗口
  const mainWindows = await createWindow();
  traySet(mainWindows);

  /*托盘设置*/

  if (!PARAMS.isPackaged)
    /*开发环境热加载*/
    autoReload(__dirname, {
      electron: require(DIRS.ASAR.end("node_modules", "electron")),
      hardResetMethod: "exit",
      awaitWriteFinish: true,
      forceHardReset: true,
      /*忽略*/
      ignored: ["**/store/*", "src"],
    });
});
