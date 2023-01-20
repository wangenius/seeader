import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./app/Router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";
import { i18nInit } from "./locales";
import "react-toastify/ReactToastify.min.css";
import "./css/index.css";

/** @Description 初始化 */
const renderInit = () => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  document.title = "GENIUS READER";
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

renderInit();
i18nInit();
