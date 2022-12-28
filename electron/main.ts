import { app, BrowserWindow } from "electron";
import * as path from "path";

const remote = require("@electron/remote/main");
remote.initialize();

function createWindow() {
  const mainWindows = new BrowserWindow({
    titleBarStyle: "hidden",
    width: 1280,
    height: 760,
    minWidth: 560,
    minHeight: 400,
    icon: path.join(__dirname, "..", "../public/icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  remote.enable(mainWindows.webContents);

  if (app.isPackaged) {
    mainWindows.loadURL(`file://${__dirname}/../index.html`);
  } else {
    mainWindows.loadURL("http://localhost:3000/index.html");

    mainWindows.webContents.openDevTools();
    if (process.env.NODE_ENV === "development")
      // Hot Reloading on 'node_modules/.bin/electronPath'
      require("electron-reload")(__dirname, {
        electron: path.join(
          __dirname,
          "..",
          "..",
          "node_modules",
          ".bin",
          "electron" + (process.platform === "win32" ? ".cmd" : "")
        ),
        forceHardReset: true,
        hardResetMethod: "exit",
      });
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});
