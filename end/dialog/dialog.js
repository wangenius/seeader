"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notification = exports.dialog_save = exports.dialog_open = exports.dialog_message = void 0;
const electron_1 = require("electron");
const Windows_1 = require("../window/Windows");
const path_1 = __importDefault(require("path"));
const dialog_message = (event, args) => electron_1.dialog.showMessageBox((0, Windows_1.currentWindow)(event), args);
exports.dialog_message = dialog_message;
const dialog_open = (event, args) => {
    return electron_1.dialog.showOpenDialog((0, Windows_1.currentWindow)(event), args);
};
exports.dialog_open = dialog_open;
const dialog_save = (event, args) => {
    return electron_1.dialog.showSaveDialog((0, Windows_1.currentWindow)(event), args);
};
exports.dialog_save = dialog_save;
const notification = (event, title, body) => new electron_1.Notification({
    title: title,
    body: body,
    icon: path_1.default.join(__dirname, "../../public/icon.png"),
}).show();
exports.notification = notification;
