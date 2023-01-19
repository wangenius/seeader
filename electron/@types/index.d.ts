/** @Description 监听方法类型 */
declare type ListenerFunc = (
  event: Electron.IpcMainInvokeEvent,
  ...args: any[]
) => any;
