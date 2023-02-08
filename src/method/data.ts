import {Channels, DataStore, Projection} from "a_root";

/** @Description 静态数据库类 */
export abstract class Data {

  /** @Description 插入数据库  */
  static insert = async <T = any>(datastore: DataStore, query: T): Promise<T> =>
    window.invoke("db_insert", datastore, query);

  /** @Description 删除 */
  static remove = async <T = any>(
    datastore: DataStore,
    query: Partial<T>
  ): Promise<T[]> => window.invoke("db_delete", datastore, query);

  /** @Description 更新词条 */
  static update = async <T = any>(
    datastore: DataStore,
    before: Partial<T>,
    after: Partial<T>
  ): Promise<T[]> =>
    window.invoke("db_update", datastore, before, { $set: after });

  /** @Description 搜索词条 */
  static select = async <T = any>(
    datastore: DataStore,
    query: Partial<T>,
    projection?: Projection<T>
  ): Promise<T[]> => window.invoke(Channels.db_find, datastore, query, projection);
}
