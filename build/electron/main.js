"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var remote = require("@electron/remote/main");
remote.initialize();
function createWindow() {
    var mainWindows = new electron_1.BrowserWindow({
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
    if (electron_1.app.isPackaged) {
        mainWindows.loadURL("file://".concat(__dirname, "/../index.html"));
    }
    else {
        mainWindows.loadURL("http://localhost:3000/index.html");
        mainWindows.webContents.openDevTools();
        if (process.env.NODE_ENV === "development")
            // Hot Reloading on 'node_modules/.bin/electronPath'
            require("electron-reload")(__dirname, {
                electron: path.join(__dirname, "..", "..", "node_modules", ".bin", "electron" + (process.platform === "win32" ? ".cmd" : "")),
                forceHardReset: true,
                hardResetMethod: "exit",
            });
    }
}
electron_1.app.whenReady().then(function () {
    createWindow();
    electron_1.app.on("activate", function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
    electron_1.app.on("window-all-closed", function () {
        if (process.platform !== "darwin") {
            electron_1.app.quit();
        }
    });
});
//# sourceMappingURL=main.js.map