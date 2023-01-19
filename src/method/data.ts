import { DataStore, Projection } from "a_root";

export abstract class Data {
  static insert = async <T = any>(datastore: DataStore, query: T): Promise<T> =>
    window.invoke("db_insert", datastore, query);

  static remove = async <T = any>(
    datastore: DataStore,
    query: Partial<T>
  ): Promise<T[]> => window.invoke("db_delete", datastore, query);

  static update = async <T = any>(
    datastore: DataStore,
    before: Partial<T>,
    after: Partial<T>
  ): Promise<T[]> =>
    window.invoke("db_update", datastore, before, { $set: after });

  static select = async <T = any>(
    datastore: DataStore,
    query: Partial<T>,
    projection?: Projection<T>
  ): Promise<T[]> => window.invoke("db_find", datastore, query, projection);
}
