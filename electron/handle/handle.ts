import { ipcMain } from "electron";
import { Channels } from "a_root";

export const handle = (
  channel: Channels,
  listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any
) => ipcMain.handle(channel, listener);
