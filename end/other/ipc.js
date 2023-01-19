"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipc_method = void 0;
const electron_1 = require("electron");
const js_mdict_1 = __importDefault(require("js-mdict"));
const path_1 = require("../@constant/path");
function ipc_method() {
    electron_1.ipcMain.handle("dict_search", dict_search);
}
exports.ipc_method = ipc_method;
/** @Description 词典搜索 */
const dict_search = (event, target, dictPath) => {
    const dict = new js_mdict_1.default(path_1.Dir_statics.enter("mdx").end(dictPath));
    return dict.lookup(target);
};
