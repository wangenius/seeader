import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { bookSlice } from "./bookSlice";
import { settingsStore } from "./settingsSlice";
import {shelfSlice} from "@/store/shelfSlice";
import {chapterSlice} from "@/store/chapterSlice";


type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export let useAppDispatch: () => AppDispatch;
useAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const storageConfig = {
  key: "root", // 必须有的
  version: 1,
  storage: storage, // 缓存机制
  blacklist: [], // reducer 里不持久化的数据,除此外均为持久化数据
};

//组合压缩器
const combinedReducer = combineReducers({
  book: bookSlice.reducer,
  settings: settingsStore.reducer,
  shelf: shelfSlice.reducer,
  chapter: chapterSlice.reducer,
});

/** @Description 持久化*/
const persistedReducer = persistReducer(storageConfig, combinedReducer);

/** @Description store生成 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export let persistor = persistStore(store);
