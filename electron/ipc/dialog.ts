import { dialog, Notification } from "electron";
import { currentWindow } from "./Windows";
import path from "path";

export const dialog_message: Motion = (event, args) =>
  dialog.showMessageBox(currentWindow(event), args);

export const dialog_open: Motion = (event, args) => {
  return dialog.showOpenDialog(currentWindow(event), args);
};

export const dialog_save: Motion = (event, args) => {
  return dialog.showSaveDialog(currentWindow(event), args);
};
export const notification: Motion = (event, title, body) =>
  new Notification({
    title: title,
    body: body,
    icon: path.join(__dirname, "../../public/icon.png"),
  }).show();
