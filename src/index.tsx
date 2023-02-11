import React from "react";
import {Router} from "./app/Router";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./data/store";
import {createRoot} from "react-dom/client";
import "react-toastify/ReactToastify.min.css";
import "@/@style/index.css";
import {AppConfig} from "a_root";
import {i18nInit} from "@/locales";

/** @Description 初始化 */
const renderInit = () => {
  /** @Description app name */
  document.title = window.paths.isPackaged ? AppConfig.name : "dev";
  /** @Description render root */
  createRoot(document.getElementById(AppConfig.HTML.root)!).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};
/** @Description 渲染初始化 */
renderInit();
i18nInit()