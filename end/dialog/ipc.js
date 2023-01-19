"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipc_dialog = void 0;
const constant_1 = require("../@constant/constant");
const dialog_1 = require("./dialog");
function ipc_dialog() {
    (0, constant_1.handle)("dialog_message", dialog_1.dialog_message);
    (0, constant_1.handle)("dialog_open", dialog_1.dialog_open);
    (0, constant_1.handle)("dialog_save", dialog_1.dialog_save);
    (0, constant_1.handle)("notification", dialog_1.notification);
}
exports.ipc_dialog = ipc_dialog;
