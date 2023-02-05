import {DataStore, Extension, Projection, Query, RemoveOptions,} from "a_root";
import Datastore from "nedb-promises";
import { Dir_dataStores} from "../@constant/path";

/** @Description 连接数据库 */
const dataStoreConnector = (datastore: DataStore) =>
  Datastore.create(Dir_dataStores.end(datastore + Extension.database));

/** @Description 插入数据 */
export const db_insert: ListenerFunc = (
  event,
  datastore: DataStore,
  query: any
) => dataStoreConnector(datastore).insert(query);

/** @Description 删除数据 */
export const db_delete: ListenerFunc = async (
  event,
  datastore: DataStore,
  query: Query,
  options: RemoveOptions
) => dataStoreConnector(datastore).remove(query, options);

/** @Description 寻找数据 */
export const db_find: ListenerFunc = async (
  event,
  datastore: DataStore,
  query: Query,
  projection: Projection<any>
) => dataStoreConnector(datastore).find(query, projection);

/** @Description 更新数据 */
export const db_update: ListenerFunc = async (
  event,
  datastore: DataStore,
  before: Query,
  after: Query
) => dataStoreConnector(datastore).update(before, after);

/** @Description 词条数目 */
export const db_count: ListenerFunc = (event, datastore: DataStore) =>
  dataStoreConnector(datastore).count({});
