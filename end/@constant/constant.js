"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = void 0;
const electron_1 = require("electron");
const handle = (channel, listener) => electron_1.ipcMain.handle(channel, listener);
exports.handle = handle;
