import { clipboard, contextBridge, ipcRenderer, shell } from "electron";
import { Dirs } from "./@constant/path";

const exp = contextBridge.exposeInMainWorld;

exp("invoke", ipcRenderer.invoke);
/** @Description 剪切板 */
exp("clipboard", clipboard);
exp("shell", shell);
/** @Description 绝对地址 */
exp("paths", Dirs);
/** @Description 文件打开 */
exp("file", (filePath: string) => require(filePath));
