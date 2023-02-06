"use strict";
var DataStore;
(function (DataStore) {
    DataStore["settings"] = "settings";
    DataStore["bookshelf"] = "bookshelf";
    DataStore["bookBody"] = "bookBody";
})(DataStore || (DataStore = {}));
var Extension;
(function (Extension) {
    Extension["database"] = ".db";
})(Extension || (Extension = {}));
var CHANNELS;
(function (CHANNELS) {
    CHANNELS["window_toggleDevTools"] = "window_toggleDevTools";
    CHANNELS["app_close"] = "app_close";
    CHANNELS["dialog_message"] = "dialog_message";
    CHANNELS["dialog_open"] = "dialog_open";
    CHANNELS["dialog_save"] = "dialog_save";
    CHANNELS["window_min"] = "window_min";
    CHANNELS["window_max"] = "window_max";
    CHANNELS["window_resize"] = "window_resize";
    CHANNELS["window_close"] = "window_close";
    CHANNELS["window_new"] = "window_new";
    CHANNELS["file_read"] = "file_read";
    CHANNELS["file_copy"] = "file_copy";
    CHANNELS["file_copy_force"] = "file_copy_force";
    CHANNELS["file_write"] = "file_write";
    CHANNELS["db_find"] = "db_find";
    CHANNELS["db_update"] = "db_update";
    CHANNELS["db_delete"] = "db_delete";
    CHANNELS["db_count"] = "db_count";
    CHANNELS["db_create"] = "db_create";
    CHANNELS["db_insert"] = "db_insert";
    CHANNELS["notification"] = "notification";
    CHANNELS["shell_open"] = "shell_open";
    CHANNELS["dict_search"] = "dict_search";
})(CHANNELS || (CHANNELS = {}));
module.exports = {
    CHANNELS: CHANNELS,
    Extension: Extension,
    DataStore: DataStore,
};
