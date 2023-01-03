"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const electron_1 = require("electron");
const ipcListener_1 = require("./ipcListener");
const this_root_1 = require("this_root");
const WIN32 = process.platform === "win32";
const BrowserConfig = {
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
    const mainWindows = new electron_1.BrowserWindow(BrowserConfig);
    if (electron_1.app.isPackaged) {
        await mainWindows.loadURL(`file://${__dirname}/../index.html`);
    }
    else {
        await mainWindows.loadURL("http://localhost:3000/index.html");
        if (this_root_1.ENV.IS_DEV)
            require("electron-reload")(__dirname, {
                electron: path.join(__dirname, `../../node_modules/.bin/electron${WIN32 ? ".cmd" : ""}`),
                forceHardReset: true,
                hardResetMethod: "exit",
            });
    }
    mainWindows.on("close", (e) => {
        e.preventDefault(); // 阻止退出程序
        new electron_1.Notification({
            title: "提示",
            body: "窗口最小化至托盘",
            icon: path.join(__dirname, "../../public/icon.png"),
        }).show();
        mainWindows.hide(); // 隐藏主程序窗口
    });
    traySet(mainWindows);
}
electron_1.app.whenReady().then(async () => {
    await createWindow();
    electron_1.app.on("activate", async () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            await createWindow();
        }
    });
    electron_1.app.on("window-all-closed", () => { });
    (0, ipcListener_1.ipcListener)();
});
const traySet = (windows) => {
    let tray;
    const icon = electron_1.nativeImage.createFromPath(path.join(__dirname, "../../public/icon.png"));
    tray = new electron_1.Tray(icon);
    tray.on("double-click", () => {
        windows.show();
    });
    const contextMenu = electron_1.Menu.buildFromTemplate([
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
                electron_1.dialog
                    .showMessageBox(windows, {
                    title: "",
                    message: "确定退出？",
                    noLink: true,
                    buttons: ["确定", "取消"],
                })
                    .then((res) => {
                    if (res.response === 0) {
                        windows.destroy();
                        electron_1.app.quit();
                    }
                });
            },
        },
    ]);
    tray.setContextMenu(contextMenu);
    tray.setToolTip("seeader");
};
//# sourceMappingURL=main.js.map