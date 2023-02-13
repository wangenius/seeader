import { ipcMain } from "electron";
import { Channels } from "local";

export const handle = (
  channel: Channels,
  listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any
) => ipcMain.handle(channel, listener);
