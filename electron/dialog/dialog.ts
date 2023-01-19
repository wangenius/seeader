import { dialog, Notification } from "electron";
import { currentWindow } from "../window/Windows";
import path from "path";

export const dialog_message: ListenerFunc = (event, args) =>
  dialog.showMessageBox(currentWindow(event), args);

export const dialog_open: ListenerFunc = (event, args) => {
  return dialog.showOpenDialog(currentWindow(event), args);
};

export const dialog_save: ListenerFunc = (event, args) => {
  return dialog.showSaveDialog(currentWindow(event), args);
};
export const notification: ListenerFunc = (event, title, body) =>
  new Notification({
    title: title,
    body: body,
    icon: path.join(__dirname, "../../public/icon.png"),
  }).show();
