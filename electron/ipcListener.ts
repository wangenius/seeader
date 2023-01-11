import {
  BrowserWindow,
  dialog,
  ipcMain,
  app,
  IpcMainInvokeEvent,
  Notification,
  shell,
  Menu,
  MenuItemConstructorOptions,
  MenuItem,
  BrowserWindowConstructorOptions,
} from "electron";
import * as fs from "fs/promises";
import { CHANNELS, DataProto, ENV } from "a_root";
import Datastore from "nedb-promises";
import * as path from "path";
import jschardet from "jschardet";
import iconvLite from "iconv-lite";
import Mdict from "js-mdict";

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
    event.sender.isDevToolsOpened()
      ? event.sender.closeDevTools()
      : event.sender.openDevTools({ mode: "undocked" });
  });
  ipcMain.handle(CHANNELS.window_min, (event) => {
    currentWindow(event).minimize();
  });
  ipcMain.handle(CHANNELS.window_max, (event) => {
    currentWindow(event).maximize();
  });
  ipcMain.handle(
    CHANNELS.window_new,
    async (
      event,
      url: string,
      BrowserConfig?: BrowserWindowConstructorOptions
    ) => {
      const newWin = new BrowserWindow(BrowserConfig);
      await newWin.loadURL(url);
    }
  );
  ipcMain.handle(CHANNELS.window_resize, (event) => {
    const win = currentWindow(event);
    win.isMaximized() ? win.unmaximize() : win.maximize();
  });
  ipcMain.handle(CHANNELS.window_close, (event) =>
    currentWindow(event).close()
  );
  ipcMain.handle(CHANNELS.app_close, (event) => {
    currentWindow(event).destroy();
    console.log(1);
    app.quit();
  });
  ipcMain.handle(CHANNELS.notification, (event, title, body) =>
    new Notification({
      title: title,
      body: body,
      icon: path.join(__dirname, "../../public/icon.png"),
    }).show()
  );
  ipcMain.handle(CHANNELS.file_write, (event, path, content) =>
    fs.writeFile(path, content)
  );
  ipcMain.handle(CHANNELS.file_read, async (event, path) => {
    try {
      await checkFileExist(path);
      const fileHandler = await fs.open(path, "r");
      const fileStats = await fs.stat(path);
      const fileContents = Buffer.alloc(fileStats.size);
      await fileHandler.read(fileContents, 0, fileContents.length);
      await fileHandler.close();
      const encoding = jschardet.detect(fileContents).encoding;
      if (encoding !== "UTF-8") return iconvLite.decode(fileContents, "gbk");
      return fileContents.toString();
    } catch (e) {
      throw e;
    }
  });
  ipcMain.handle(CHANNELS.file_copy, (event, path, target) =>
    fs.copyFile(path, target)
  );

  ipcMain.handle(CHANNELS.file_exist, (event, path) => checkFileExist(path));
  ipcMain.handle(CHANNELS.shell_open, (event, filePath) => {
    if (app.isPackaged) return shell.openPath(path.join(__dirname, filePath));
    return shell.openPath(path.join(__dirname, "..", "..", filePath));
  });

  ipcMain.handle(
    CHANNELS.dict_search,
    (event, target: string, dictPath: string) => {
      console.log(path.join(__dirname, "..", "..", dictPath));
      const dict = new Mdict(path.join(__dirname, "..", "..", dictPath));
      return dict.lookup(target);
    }
  );

  /** database */
  ipcMain.handle(
    CHANNELS.db_insert,
    (event, datastore: DataProto.DBStore, query: any) => {
      return connector(datastore).insert(query);
    }
  );
  ipcMain.handle(
    CHANNELS.db_delete,
    async (
      event,
      datastore: DataProto.DBStore,
      query: DataProto.Query,
      options: DataProto.RemoveOptions
    ) => {
      return connector(datastore).remove(query, options);
    }
  );
  ipcMain.handle(
    CHANNELS.db_find,
    async (
      event,
      datastore: DataProto.DBStore,
      query: DataProto.Query,
      projection: DataProto.Projection<any>
    ) => {
      return connector(datastore).find(query, projection);
    }
  );
  ipcMain.handle(
    CHANNELS.db_update,
    async (
      event,
      datastore: DataProto.DBStore,
      before: DataProto.Query,
      after: DataProto.Query
    ) => {
      return connector(datastore).update(before, after);
    }
  );
  ipcMain.handle(CHANNELS.db_count, (event, datastore: DataProto.DBStore) => {
    return connector(datastore).count({});
  });
}

export function currentWindow(event: IpcMainInvokeEvent) {
  return BrowserWindow.fromWebContents(event.sender) as BrowserWindow;
}

export function checkFileExist(path: string) {
  return fs.access(path, fs.constants.F_OK);
}

export function connector(datastore: DataProto.DBStore) {
  return Datastore.create(path.join(__dirname, "data", datastore + ".db"));
}
