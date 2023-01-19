export const remote = window.invoke;

/** @Description 剪切板 */
export abstract class Clipboard {
  static copy = (text: string) => window.clipboard.writeText(text);
  static read = window.clipboard.readText;
}
