import React from "react";
import {Router} from "./app/Router";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./store/store";
import {createRoot} from "react-dom/client";
import "react-toastify/ReactToastify.min.css";
import "@/@style/index.css";
import {i18nInit} from "@/locales";
import {v} from "@/method/v";

/** @Description 初始化 */
const renderInit = () => {
  /** @Description app name */
  document.title = v.PATHS.isPackaged ? v.CONFIG.name : "dev";
  /** @Description render local */
  createRoot(document.getElementById(v.CONFIG.HTML.root)!).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};
// if (!store.getState().shelf.books) _shelf.load()
renderInit();
i18nInit();
