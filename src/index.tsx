import React from "react";
import {Router} from "./app/Router";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./store/store";
import {i18nInit} from "./locales";
import {createRoot} from "react-dom/client";
import "react-toastify/ReactToastify.min.css";
import "@/@style/index.css";
import {Config} from "a_root";

/** @Description 初始化 */
const renderInit = () => {
  /** @Description app name */
  document.title = Config.name;
  /** @Description render root */
  createRoot(document.getElementById(Config.HTML.root)!).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};
/** @Description 渲染初始化 */
renderInit();
/** @Description 本地化初始化 */
i18nInit();
