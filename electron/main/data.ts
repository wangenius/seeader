import { config, Projection, Query, RemoveOptions } from "local";
import Datastore from "nedb-promises";
import { Dir_Data } from "../@constant/path";

export abstract class Dastore {
  static connect(storename: string) {
    const path = Dir_Data.end(storename + config.extension.database);
    return Datastore.create({ filename: path, autoload: true });
  }

  static insert(store: string, query: any) {
    return Dastore.connect(store).insert(query);
  }

  static select(store: string, query: any, projection?: Projection<any>) {
    return Dastore.connect(store).find(query, projection);
  }

  static delete(store: string, query: any, options?: RemoveOptions) {
    return Dastore.connect(store).remove(query, options);
  }

  static update(store: string, before: Query, after: Query) {
    return Dastore.connect(store).update(before, after);
  }
}
