import { Channels, DataStore, Projection } from "local";
import { app } from "@/method/app";

export const data = () => DataStore;

/** @Description 插入数据库  */
data.insert = async <T = any>(datastore: DataStore, query: T): Promise<T> =>
  app(Channels.db_insert, datastore, query);

/** @Description 删除 */
data.remove = async <T = any>(
  datastore: DataStore,
  query: Partial<T>
): Promise<T[]> => app(Channels.db_delete, datastore, query);

/** @Description 更新词条 */
data.update = async <T = any>(
  datastore: DataStore,
  before: Partial<T>,
  after: Partial<T>
): Promise<T[]> =>
  app(Channels.db_update, datastore, before, { $set: after });

/** @Description 搜索词条 */
data.select = async <T = any>(
  datastore: DataStore,
  query: Partial<T> = {},
  projection?: Projection<T>
): Promise<T[]> => app(Channels.db_find, datastore, query, projection);
