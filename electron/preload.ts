import { clipboard, contextBridge, ipcRenderer, shell } from "electron";
import { PATHS } from "./@constant/path";

const exp = contextBridge.exposeInMainWorld;

exp("invoke", ipcRenderer.invoke);
/** @Description 剪切板 */
exp("clipboard", clipboard);
exp("shell", shell);
/** @Description 绝对地址 */
exp("PATHS", PATHS);
/** @Description 文件打开 */
exp("req", (filePath: string) => {
  return require(filePath);
});
