import {store} from "@/store/store";
import {shelfSlice} from "@/store/shelfSlice";
import {v} from "@/method/v";

/** @Description 更新store shelf 对象 */
export const _shelf = () => {
  console.log(store.getState().shelf);
  return store.getState().shelf;
};

/** @Description update store */
_shelf.lap = (books: Book[]) => {
  store.dispatch(shelfSlice.actions.lap(books));
};

/** @Description load  from database */
_shelf.load = async () => {
  const res = await v.fetchData("shelf");
  _shelf.lap(res);
};

/** @Description export */
_shelf.export = async () => {
  return await v.i("shelf_export");
};

/** @Description import */
_shelf.import = async () => {
  const mass = await v.i("shelf_import");
  await _shelf.load();
  return mass;
};
