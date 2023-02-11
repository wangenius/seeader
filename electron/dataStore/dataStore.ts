import {DataStore, AppConfig, Projection, Query, RemoveOptions} from "local";
import Datastore from "nedb-promises";
import {Dir_Data} from "../@constant/path";
import * as fs from "fs";

/** @Description 连接数据库 */
const dataStoreConnector = (datastore: DataStore) => {
  const path = Dir_Data.end(datastore + AppConfig.extension.database);
  try {
    fs.accessSync(path);
    return Datastore.create({
      filename: path,
    });
  } catch {
    return Datastore.create({
      filename: path,
      autoload: true,
    });
  }
};

/** @Description 插入数据 */
export const db_insert: Motion = (
  event,
  datastore: DataStore,
  query: any
) => dataStoreConnector(datastore).insert(query);

/** @Description 删除数据 */
export const db_delete: Motion = async (
  event,
  datastore: DataStore,
  query: Query,
  options: RemoveOptions
) => dataStoreConnector(datastore).remove(query, options);

/** @Description 寻找数据 */
export const db_find: Motion = async (
  event,
  datastore: DataStore,
  query: Query,
  projection: Projection<any>
) => {
 return  dataStoreConnector(datastore).find(query, projection);
};

/** @Description 更新数据 */
export const db_update: Motion = async (
  event,
  datastore: DataStore,
  before: Query,
  after: Query
) => dataStoreConnector(datastore).update(before, after);

/** @Description 词条数目 */
export const db_count: Motion = (event, datastore: DataStore) =>
  dataStoreConnector(datastore).count({});
