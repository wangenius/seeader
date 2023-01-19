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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const electron_1 = require("electron");
const electron_reload_1 = __importDefault(require("electron-reload"));
const Windows_1 = require("./window/Windows");
const path_1 = require("./@constant/path");
const ipc_1 = require("./ipc");
const icon_path = path_1.Dir_statics.end("icon", "icon.png");
/** @Description 窗口特性 */
const BrowserConfig = {
    titleBarStyle: "hidden",
    width: 1280,
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
function createWindow() {
    return __awaiter(this, void 0, void 0, function* () {
        /*创建窗口对象*/
        const mainWindows = new electron_1.BrowserWindow(BrowserConfig);
        /*链接HTML地址*/
        if (electron_1.app.isPackaged)
            yield mainWindows.loadURL(path_1.Dir_statics.end("index.html"));
        else
            yield mainWindows.loadURL("http://localhost:3000/index.html");
        /*优化启动白屏问题*/
        mainWindows.on("ready-to-show", () => {
            mainWindows.show();
            mainWindows.focus();
        });
        /*关闭最小化至托盘*/
        mainWindows.on("close", (e) => {
            e.preventDefault(); // 阻止退出程序
            new electron_1.Notification({
                title: "提示",
                body: "窗口最小化至托盘",
                icon: icon_path,
            }).show();
            mainWindows.hide(); // 隐藏主程序窗口
        });
        return mainWindows;
    });
}
/*app完成*/
electron_1.app.whenReady().then(() => __awaiter(void 0, void 0, void 0, function* () {
    // 创建窗口
    const mainWindows = yield createWindow();
    /*托盘设置*/
    traySet(mainWindows);
    /*handle监听*/
    (0, ipc_1.ipc_method)();
    (0, ipc_1.ipc_file)();
    (0, ipc_1.ipc_datastore)();
    (0, ipc_1.ipc_win)();
    (0, ipc_1.ipc_dialog)();
    if (!electron_1.app.isPackaged)
        /*开发环境热加载*/
        (0, electron_reload_1.default)(__dirname, {
            electron: require(path_1.Dir_asar.end("node_modules", "electron")),
            hardResetMethod: "exit",
            awaitWriteFinish: true,
            forceHardReset: true,
            /*忽略*/
            ignored: ["**/data/*", "src"],
        });
}));
/** @Description 托盘设置 */
function traySet(windows) {
    const icon = electron_1.nativeImage.createFromPath(icon_path);
    const tray = new electron_1.Tray(icon);
    tray.on("double-click", () => windows.show());
    const contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: "打开主界面",
            click: () => windows.show(),
        },
        {
            label: "退出",
            click: () => (0, Windows_1.appExit)(windows),
        },
    ]);
    tray.setContextMenu(contextMenu);
    tray.setToolTip("seeader");
}
