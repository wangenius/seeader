import React from "react";
import {Router} from "./app/Router";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./data/store";
import {createRoot} from "react-dom/client";
import "react-toastify/ReactToastify.min.css";
import "@/@style/index.css";
import {app} from "@/method/app";
import {i18nInit} from "@/locales";

/** @Description 初始化 */
const renderInit = () => {
    /** @Description app name */
    document.title = window.paths.isPackaged ? app.config.name : "dev";
    /** @Description render local */
    createRoot(document.getElementById(app.config.HTML.root)!).render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router/>
            </PersistGate>
        </Provider>
    );
};
/** @Description 渲染初始化 */
renderInit();
i18nInit();
