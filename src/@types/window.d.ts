interface Window extends Window {
  invoke: (channel: import("a_root"), ...args: any[]) => Promise<any>;
  clipboard: import("electron").Clipboard;
  shell:import('electron').Shell;
  [propsName: string]: any;
}

declare const window: Window;
