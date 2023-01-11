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
exports.connector = exports.checkFileExist = exports.currentWindow = exports.ipcListener = void 0;
const electron_1 = require("electron");
const fs = __importStar(require("fs/promises"));
const a_root_1 = require("a_root");
const nedb_promises_1 = __importDefault(require("nedb-promises"));
const path = __importStar(require("path"));
const jschardet_1 = __importDefault(require("jschardet"));
const iconv_lite_1 = __importDefault(require("iconv-lite"));
const js_mdict_1 = __importDefault(require("js-mdict"));
function ipcListener() {
    electron_1.ipcMain.handle(a_root_1.CHANNELS.dialog_message, (event, args) => electron_1.dialog.showMessageBox(currentWindow(event), args));
    electron_1.ipcMain.handle(a_root_1.CHANNELS.dialog_open, (event, args) => {
        return electron_1.dialog.showOpenDialog(currentWindow(event), args);
    });
    electron_1.ipcMain.handle(a_root_1.CHANNELS.dialog_save, (event, args) => {
        return electron_1.dialog.showSaveDialog(currentWindow(event), args);
    });
    electron_1.ipcMain.handle(a_root_1.CHANNELS.window_toggleDevTools, (event) => {
        event.sender.isDevToolsOpened()
            ? event.sender.closeDevTools()
            : event.sender.openDevTools({ mode: "undocked" });
    });
    electron_1.ipcMain.handle(a_root_1.CHANNELS.window_min, (event) => {
        currentWindow(event).minimize();
    });
    electron_1.ipcMain.handle(a_root_1.CHANNELS.window_max, (event) => {
        currentWindow(event).maximize();
    });
    electron_1.ipcMain.handle(a_root_1.CHANNELS.window_new, (event, url, BrowserConfig) => __awaiter(this, void 0, void 0, function* () {
        const newWin = new electron_1.BrowserWindow(BrowserConfig);
        yield newWin.loadURL(url);
    }));
    electron_1.ipcMain.handle(a_root_1.CHANNELS.window_resize, (event) => {
        const win = currentWindow(event);
        win.isMaximized() ? win.unmaximize() : win.maximize();
    });
    electron_1.ipcMain.handle(a_root_1.CHANNELS.window_close, (event) => currentWindow(event).close());
    electron_1.ipcMain.handle(a_root_1.CHANNELS.app_close, (event) => {
        currentWindow(event).destroy();
        console.log(1);
        electron_1.app.quit();
    });
    electron_1.ipcMain.handle(a_root_1.CHANNELS.notification, (event, title, body) => new electron_1.Notification({
        title: title,
        body: body,
        icon: path.join(__dirname, "../../public/icon.png"),
    }).show());
    electron_1.ipcMain.handle(a_root_1.CHANNELS.file_write, (event, path, content) => fs.writeFile(path, content));
    electron_1.ipcMain.handle(a_root_1.CHANNELS.file_read, (event, path) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield checkFileExist(path);
            const fileHandler = yield fs.open(path, "r");
            const fileStats = yield fs.stat(path);
            const fileContents = Buffer.alloc(fileStats.size);
            yield fileHandler.read(fileContents, 0, fileContents.length);
            yield fileHandler.close();
            const encoding = jschardet_1.default.detect(fileContents).encoding;
            if (encoding !== "UTF-8")
                return iconv_lite_1.default.decode(fileContents, "gbk");
            return fileContents.toString();
        }
        catch (e) {
            throw e;
        }
    }));
    electron_1.ipcMain.handle(a_root_1.CHANNELS.file_copy, (event, path, target) => fs.copyFile(path, target));
    electron_1.ipcMain.handle(a_root_1.CHANNELS.file_exist, (event, path) => checkFileExist(path));
    electron_1.ipcMain.handle(a_root_1.CHANNELS.shell_open, (event, filePath) => {
        if (electron_1.app.isPackaged)
            return electron_1.shell.openPath(path.join(__dirname, filePath));
        return electron_1.shell.openPath(path.join(__dirname, "..", "..", filePath));
    });
    electron_1.ipcMain.handle(a_root_1.CHANNELS.dict_search, (event, target, dictPath) => {
        console.log(path.join(__dirname, "..", "..", dictPath));
        const dict = new js_mdict_1.default(path.join(__dirname, "..", "..", dictPath));
        return dict.lookup(target);
    });
    /** database */
    electron_1.ipcMain.handle(a_root_1.CHANNELS.db_insert, (event, datastore, query) => {
        return connector(datastore).insert(query);
    });
    electron_1.ipcMain.handle(a_root_1.CHANNELS.db_delete, (event, datastore, query, options) => __awaiter(this, void 0, void 0, function* () {
        return connector(datastore).remove(query, options);
    }));
    electron_1.ipcMain.handle(a_root_1.CHANNELS.db_find, (event, datastore, query, projection) => __awaiter(this, void 0, void 0, function* () {
        return connector(datastore).find(query, projection);
    }));
    electron_1.ipcMain.handle(a_root_1.CHANNELS.db_update, (event, datastore, before, after) => __awaiter(this, void 0, void 0, function* () {
        return connector(datastore).update(before, after);
    }));
    electron_1.ipcMain.handle(a_root_1.CHANNELS.db_count, (event, datastore) => {
        return connector(datastore).count({});
    });
}
exports.ipcListener = ipcListener;
function currentWindow(event) {
    return electron_1.BrowserWindow.fromWebContents(event.sender);
}
exports.currentWindow = currentWindow;
function checkFileExist(path) {
    return fs.access(path, fs.constants.F_OK);
}
exports.checkFileExist = checkFileExist;
function connector(datastore) {
    return nedb_promises_1.default.create(path.join(__dirname, "data", datastore + ".db"));
}
exports.connector = connector;
