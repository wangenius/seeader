"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipc_datastore = exports.ipc_dialog = exports.ipc_file = exports.ipc_method = exports.ipc_win = void 0;
const constant_1 = require("./@constant/constant");
const Windows_1 = require("./window/Windows");
const dict_1 = require("./other/dict");
const FileHandler_1 = require("./file/FileHandler");
const dialog_1 = require("./dialog/dialog");
const dataStore_1 = require("./dataStore/dataStore");
const a_root_1 = require("a_root");
function ipc_win() {
    (0, constant_1.handle)(a_root_1.CHANNELS.window_toggleDevTools, Windows_1.window_toggleDevTools);
    (0, constant_1.handle)(a_root_1.CHANNELS.window_min, Windows_1.window_min);
    (0, constant_1.handle)(a_root_1.CHANNELS.window_max, Windows_1.window_max);
    (0, constant_1.handle)(a_root_1.CHANNELS.window_new, Windows_1.window_new);
    (0, constant_1.handle)(a_root_1.CHANNELS.window_resize, Windows_1.window_resize);
    (0, constant_1.handle)(a_root_1.CHANNELS.window_close, Windows_1.window_close);
    (0, constant_1.handle)(a_root_1.CHANNELS.app_close, Windows_1.app_close);
}
exports.ipc_win = ipc_win;
function ipc_method() {
    (0, constant_1.handle)(a_root_1.CHANNELS.dict_search, dict_1.dict_search);
}
exports.ipc_method = ipc_method;
function ipc_file() {
    (0, constant_1.handle)(a_root_1.CHANNELS.file_write, FileHandler_1.file_write);
    (0, constant_1.handle)(a_root_1.CHANNELS.file_read, FileHandler_1.file_read);
    (0, constant_1.handle)(a_root_1.CHANNELS.file_copy, FileHandler_1.file_copy);
    (0, constant_1.handle)(a_root_1.CHANNELS.file_copy_force, FileHandler_1.file_copy_force);
    (0, constant_1.handle)(a_root_1.CHANNELS.shell_open, FileHandler_1.shell_open);
}
exports.ipc_file = ipc_file;
function ipc_dialog() {
    (0, constant_1.handle)(a_root_1.CHANNELS.dialog_message, dialog_1.dialog_message);
    (0, constant_1.handle)(a_root_1.CHANNELS.dialog_open, dialog_1.dialog_open);
    (0, constant_1.handle)(a_root_1.CHANNELS.dialog_save, dialog_1.dialog_save);
    (0, constant_1.handle)(a_root_1.CHANNELS.notification, dialog_1.notification);
}
exports.ipc_dialog = ipc_dialog;
/** @Description 数据库的ipc handle */
function ipc_datastore() {
    (0, constant_1.handle)(a_root_1.CHANNELS.db_insert, dataStore_1.db_insert);
    (0, constant_1.handle)(a_root_1.CHANNELS.db_delete, dataStore_1.db_delete);
    (0, constant_1.handle)(a_root_1.CHANNELS.db_find, dataStore_1.db_find);
    (0, constant_1.handle)(a_root_1.CHANNELS.db_update, dataStore_1.db_update);
    (0, constant_1.handle)(a_root_1.CHANNELS.db_count, dataStore_1.db_count);
}
exports.ipc_datastore = ipc_datastore;
