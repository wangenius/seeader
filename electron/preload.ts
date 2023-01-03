const { contextBridge, ipcRenderer, clipboard, shell } = require("electron");
contextBridge.exposeInMainWorld("invoke", ipcRenderer.invoke);
contextBridge.exposeInMainWorld("clipboard", clipboard);
contextBridge.exposeInMainWorld("shell", shell);
