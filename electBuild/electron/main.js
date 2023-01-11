"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const electron_1 = require("electron");
const ipcListener_1 = require("./ipcListener");
const a_root_1 = require("a_root");
const WIN32 = process.platform === "win32";
const BrowserConfig = {
    titleBarStyle: "hidden",
    width: 1280,
    height: 760,
    minWidth: 560,
    minHeight: 660,
    icon: path.join(__dirname, "../../public/icon.png"),
    webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: true,
        contextIsolation: true,
    },
};
function createWindow() {
    return __awaiter(this, void 0, void 0, function* () {
        const mainWindows = new electron_1.BrowserWindow(BrowserConfig);
        if (electron_1.app.isPackaged) {
            yield mainWindows.loadURL(`file://${__dirname}/../../index.html`);
        }
        else {
            yield mainWindows.loadURL("http://localhost:3000/index.html");
            if (a_root_1.ENV.IS_DEV)
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
    });
}
electron_1.app.whenReady().then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield createWindow();
    electron_1.app.on("activate", () => __awaiter(void 0, void 0, void 0, function* () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            yield createWindow();
        }
    }));
    electron_1.app.on("window-all-closed", () => { });
    (0, ipcListener_1.ipcListener)();
}));
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
