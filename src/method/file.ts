export abstract class File {
  static save = (path: string, content: string) =>
    window.invoke("file_write", path, content);

  static read = (path: string): Promise<string> =>
    window.invoke("file_read", path);

  static copy = (src: string, dest: string) =>
    window.invoke("file_copy", src, dest);

  static copyForce = (src: string, dest: string) =>
    window.invoke("file_copy_force", src, dest);
}
