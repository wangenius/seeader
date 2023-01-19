import { app, ipcMain } from "electron";
import path from "path";
import { CHANNELS } from "a_root";

export const handle = (
  channel: CHANNELS,
  listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any
) => ipcMain.handle(channel, listener);
