export const remote = window.invoke;

/** @Description 剪切板 */
export abstract class Clipboard {
  /** @Description 拷贝 */
  static copy = (text: string) => window.clipboard.writeText(text);
  /** @Description 读取 */
  static read = window.clipboard.readText;
}
