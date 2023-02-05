"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_count = exports.db_update = exports.db_find = exports.db_delete = exports.db_insert = void 0;
const a_root_1 = require("a_root");
const nedb_promises_1 = __importDefault(require("nedb-promises"));
const path_1 = require("../@constant/path");
/** @Description 连接数据库 */
const dataStoreConnector = (datastore) => nedb_promises_1.default.create(path_1.Dir_dataStores.end(datastore + a_root_1.Extension.database));
/** @Description 插入数据 */
const db_insert = (event, datastore, query) => dataStoreConnector(datastore).insert(query);
exports.db_insert = db_insert;
/** @Description 删除数据 */
const db_delete = (event, datastore, query, options) => __awaiter(void 0, void 0, void 0, function* () { return dataStoreConnector(datastore).remove(query, options); });
exports.db_delete = db_delete;
/** @Description 寻找数据 */
const db_find = (event, datastore, query, projection) => __awaiter(void 0, void 0, void 0, function* () { return dataStoreConnector(datastore).find(query, projection); });
exports.db_find = db_find;
/** @Description 更新数据 */
const db_update = (event, datastore, before, after) => __awaiter(void 0, void 0, void 0, function* () { return dataStoreConnector(datastore).update(before, after); });
exports.db_update = db_update;
/** @Description 词条数目 */
const db_count = (event, datastore) => dataStoreConnector(datastore).count({});
exports.db_count = db_count;
