import { config, Projection, Query, RemoveOptions } from "local";
import Datastore from "nedb-promises";
import {DIRS} from "../@constant/path";

/** @Description 数据库 */
export abstract class db {
  /** @Description connector */
  static connect(storename: string) {
    const path = DIRS.DATA.end(storename + config.extension.database);
    return Datastore.create({ filename: path, autoload: true });
  }

  /** @Description insert */
  static insert(store: string, query: any) {
    return db.connect(store).insert(query);
  }

  /** @Description select */
  static select(store: string, query: any={}, projection?: Projection<any>) {
    return db.connect(store).find(query, projection);
  }

  /** @Description delete */
  static delete(store: string, query: any, options?: RemoveOptions) {
    return db.connect(store).remove(query, options);
  }

  /** @Description update */
  static update(store: string, before: Query, after: Query) {
    return db.connect(store).update(before, after);
  }
}
