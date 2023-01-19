import * as Electron from "electron";
import { CHANNELS } from "a_root";

declare global {
  interface Window {
    invoke: (channel: CHANNELS, ...args: any[]) => Promise<any>;
    clipboard: Electron.Clipboard;
    [propsName: string]: any;
  }
}
