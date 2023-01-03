"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFileExist = exports.currentWindow = exports.ipcListener = void 0;
const electron_1 = require("electron");
const fs = require("fs");
const this_root_1 = require("this_root");
function ipcListener() {
    electron_1.ipcMain.handle(this_root_1.CHANNELS.dialog_message, (event, args) => electron_1.dialog.showMessageBox(currentWindow(event), args));
    electron_1.ipcMain.handle(this_root_1.CHANNELS.dialog_open, (event, args) => {
        return electron_1.dialog.showOpenDialog(currentWindow(event), args);
    });
    electron_1.ipcMain.handle(this_root_1.CHANNELS.dialog_save, (event, args) => {
        return electron_1.dialog.showSaveDialog(currentWindow(event), args);
    });
    electron_1.ipcMain.handle(this_root_1.CHANNELS.window_toggleDevTools, (event) => {
        event.sender.toggleDevTools();
    });
    electron_1.ipcMain.handle(this_root_1.CHANNELS.window_min, (event) => {
        currentWindow(event).minimize();
    });
    electron_1.ipcMain.handle(this_root_1.CHANNELS.window_max, (event) => {
        currentWindow(event).maximize();
    });
    electron_1.ipcMain.handle(this_root_1.CHANNELS.window_resize, (event) => {
        const win = currentWindow(event);
        win.isMaximized() ? win.unmaximize() : win.maximize();
    });
    electron_1.ipcMain.handle(this_root_1.CHANNELS.window_close, (event) => currentWindow(event).close());
    electron_1.ipcMain.handle(this_root_1.CHANNELS.file_write, (event, path, content) => fs.writeFileSync(path, content));
    electron_1.ipcMain.handle(this_root_1.CHANNELS.file_read, (event, path) => {
        try {
            fs.accessSync(path, fs.constants.F_OK);
            return fs.readFileSync(path);
        }
        catch (e) {
            throw e;
        }
    });
    electron_1.ipcMain.handle(this_root_1.CHANNELS.file_copy, (event, path, target) => fs.copyFileSync(path, target));
    electron_1.ipcMain.handle(this_root_1.CHANNELS.file_exist, (event, path) => checkFileExist(path));
    electron_1.ipcMain.handle(this_root_1.CHANNELS.db_create, () => { });
}
exports.ipcListener = ipcListener;
function currentWindow(event) {
    return electron_1.BrowserWindow.fromWebContents(event.sender);
}
exports.currentWindow = currentWindow;
function checkFileExist(path) {
    try {
        fs.accessSync(path, fs.constants.F_OK);
    }
    catch (e) {
        throw e;
    }
}
exports.checkFileExist = checkFileExist;
//# sourceMappingURL=ipcListener.js.map