/** @Description 监听方法类型 */
declare type Motion = (
  event: Electron.IpcMainInvokeEvent,
  ...args: any[]
) => any;
