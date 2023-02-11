import { Channels, DataStore, Projection } from "a_root";
import { invoke } from "@/method/invoke";

export const data = () => DataStore;

/** @Description 插入数据库  */
data.insert = async <T = any>(datastore: DataStore, query: T): Promise<T> =>
  invoke(Channels.db_insert, datastore, query);

/** @Description 删除 */
data.remove = async <T = any>(
  datastore: DataStore,
  query: Partial<T>
): Promise<T[]> => invoke(Channels.db_delete, datastore, query);

/** @Description 更新词条 */
data.update = async <T = any>(
  datastore: DataStore,
  before: Partial<T>,
  after: Partial<T>
): Promise<T[]> =>
  invoke(Channels.db_update, datastore, before, { $set: after });

/** @Description 搜索词条 */
data.select = async <T = any>(
  datastore: DataStore,
  query: Partial<T> = {},
  projection?: Projection<T>
): Promise<T[]> => invoke(Channels.db_find, datastore, query, projection);
