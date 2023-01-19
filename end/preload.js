"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("invoke", electron_1.ipcRenderer.invoke);
electron_1.contextBridge.exposeInMainWorld("clipboard", electron_1.clipboard);
electron_1.contextBridge.exposeInMainWorld("shell", electron_1.shell);
