import { contextBridge, ipcRenderer, clipboard, shell } from "electron";

contextBridge.exposeInMainWorld("invoke", ipcRenderer.invoke);
contextBridge.exposeInMainWorld("clipboard", clipboard);
contextBridge.exposeInMainWorld("shell", shell);
