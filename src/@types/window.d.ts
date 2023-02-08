interface Window extends Window {
  invoke: (
    channel: keyof typeof import("a_root").Channels,
    ...args: any[]
  ) => Promise<any>;
  clipboard: import("electron").Clipboard;
  shell: import("electron").Shell;

  [propsName: string]: any;
}

declare const window: Window;

declare module "*.svg" {
  const content: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.png" {
  const content: React.StatelessComponent<React.ImgHTMLAttributes<HTMLDivElement>>;
  export default content;
}
