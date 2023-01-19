"use strict";
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
exports.window_close = exports.window_new = exports.window_resize = exports.window_max = exports.window_min = exports.window_toggleDevTools = exports.app_close = exports.appExit = exports.currentWindow = void 0;
const electron_1 = require("electron");
const path_1 = require("../@constant/path");
const lodash_1 = __importDefault(require("lodash"));
function currentWindow(event) {
    return electron_1.BrowserWindow.fromWebContents(event.sender);
}
exports.currentWindow = currentWindow;
function appExit(window) {
    window.focus();
    electron_1.dialog
        .showMessageBox(window, {
        title: "",
        message: "确定退出？",
        noLink: true,
        buttons: ["确定", "取消"],
    })
        .then((res) => {
        if (res.response === 0) {
            window.destroy();
            electron_1.app.quit();
        }
    });
}
exports.appExit = appExit;
const app_close = (event) => {
    currentWindow(event).destroy();
    electron_1.app.quit();
};
exports.app_close = app_close;
const window_toggleDevTools = (event) => {
    event.sender.isDevToolsOpened()
        ? event.sender.closeDevTools()
        : event.sender.openDevTools({ mode: "undocked" });
};
exports.window_toggleDevTools = window_toggleDevTools;
const window_min = (event) => {
    currentWindow(event).minimize();
};
exports.window_min = window_min;
const window_max = (event) => {
    currentWindow(event).maximize();
};
exports.window_max = window_max;
const window_resize = (event) => {
    const win = currentWindow(event);
    win.isMaximized() ? win.unmaximize() : win.maximize();
};
exports.window_resize = window_resize;
const window_new = (event, url, BrowserConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const init = {
        icon: path_1.Dir_statics.end("icon", "icon.png"),
        autoHideMenuBar: true,
    };
    const newWin = new electron_1.BrowserWindow(lodash_1.default.defaultsDeep(BrowserConfig, init));
    yield newWin.loadURL(url);
});
exports.window_new = window_new;
const window_close = (event) => {
    currentWindow(event).close();
};
exports.window_close = window_close;
