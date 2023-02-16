import { Projection } from "local";
import { app } from "@/method/app";

export const data = <T = any>(
    datastore: string,
    query: Partial<T> = {},
    projection?: Projection<T>
): Promise<T[]> => app("db_find", datastore, query, projection);

/** @Description 更新词条 */
data.update = async <T = any>(
  datastore: string,
  before: Partial<T>,
  after: Partial<T>
): Promise<T[]> => app("db_update", datastore, before, { $set: after });