import { BrowserWindow, dialog, ipcMain, IpcMainInvokeEvent } from "electron";
import * as fs from "fs";
import { CHANNELS } from "this_root";
import Datastore = require("nedb");
export function ipcListener() {
  ipcMain.handle(CHANNELS.dialog_message, (event, args) =>
    dialog.showMessageBox(currentWindow(event), args)
  );
  ipcMain.handle(CHANNELS.dialog_open, (event, args) => {
    return dialog.showOpenDialog(currentWindow(event), args);
  });
  ipcMain.handle(CHANNELS.dialog_save, (event, args) => {
    return dialog.showSaveDialog(currentWindow(event), args);
  });
  ipcMain.handle(CHANNELS.window_toggleDevTools, (event) => {
    event.sender.toggleDevTools();
  });
  ipcMain.handle(CHANNELS.window_min, (event) => {
    currentWindow(event).minimize();
  });
  ipcMain.handle(CHANNELS.window_max, (event) => {
    currentWindow(event).maximize();
  });
  ipcMain.handle(CHANNELS.window_resize, (event) => {
    const win = currentWindow(event);
    win.isMaximized() ? win.unmaximize() : win.maximize();
  });
  ipcMain.handle(CHANNELS.window_close, (event) =>
    currentWindow(event).close()
  );
  ipcMain.handle(CHANNELS.file_write, (event, path, content) =>
    fs.writeFileSync(path, content)
  );
  ipcMain.handle(CHANNELS.file_read, (event, path) => {
    try {
      fs.accessSync(path, fs.constants.F_OK);
      return fs.readFileSync(path);
    } catch (e) {
      throw e;
    }
  });
  ipcMain.handle(CHANNELS.file_copy, (event, path, target) =>
    fs.copyFileSync(path, target)
  );
  ipcMain.handle(CHANNELS.file_exist, (event, path) => checkFileExist(path));

  ipcMain.handle(CHANNELS.db_insert, () => {
    let db = new Datastore({ filename: "path/datafile", autoload: true });
    db.insert({ hello: "world" }, () => {
      db.findOne({ hello: "world" }, (err, doc) => {
        console.log(doc);
      });
    });
  });
}

export function currentWindow(event: IpcMainInvokeEvent) {
  return BrowserWindow.fromWebContents(event.sender) as BrowserWindow;
}

export function checkFileExist(path: string) {
  try {
    fs.accessSync(path, fs.constants.F_OK);
  } catch (e) {
    throw e;
  }
}
