/** @Description 监听方法类型 */
declare type Motion = (
  event: Electron.IpcMainInvokeEvent,
  ...args: any[]
) => any;

declare type ReturnV<T = { [props: string]: any }> = Promise<{
  code: number;
  body?: T;
  msg?: string;
}>;
