interface Window extends Window {
  /** @Description communicate with electron */
  invoke(
    channel: keyof typeof import("local").Channels | string,
    ...args: any[]
  ): Promise<any>;
  /** @Description clipboard */
  clipboard: import("electron").Clipboard;
  /** @Description showItemInFolder etc */
  shell: import("electron").Shell;
  /** @Description 绝对路径 */
  paths: any;

  /** @Description 导入文件 */
  req<T>(filepath: string): T;

  [propsName: string]: any;
}

declare const window: Window;

declare module "*.svg" {
  const content: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.png" {
  const content: React.StatelessComponent<
    React.ImgHTMLAttributes<HTMLDivElement>
  >;
  export default content;
}
