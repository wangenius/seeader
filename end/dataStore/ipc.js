"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipc_datastore = void 0;
const dataStore_1 = require("./dataStore");
const constant_1 = require("../@constant/constant");
/** @Description 数据库的ipc handle */
function ipc_datastore() {
    (0, constant_1.handle)("db_insert", dataStore_1.db_insert);
    (0, constant_1.handle)("db_delete", dataStore_1.db_delete);
    (0, constant_1.handle)("db_find", dataStore_1.db_find);
    (0, constant_1.handle)("db_update", dataStore_1.db_update);
    (0, constant_1.handle)("db_count", dataStore_1.db_count);
}
exports.ipc_datastore = ipc_datastore;
