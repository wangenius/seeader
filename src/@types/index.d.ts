import * as Electron from "electron";
import { CHANNELS } from "this_root";

declare global {
  interface Window {
    invoke: (channel: CHANNELS, ...args: any[]) => Promise<any>;
    clipboard: Electron.Clipboard;
    shell: Electron.shell;
    [propsName: string]: any;
  }
}
