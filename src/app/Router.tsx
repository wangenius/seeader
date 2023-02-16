import { HashRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { BookPage } from "./BookPage";
import { ShelfPage } from "./ShelfPage";
import { SettingsPage } from "./SettingsPage";

import { createBrowserHistory } from "history";
import {app} from "@/method/app";

export const history = createBrowserHistory();
export const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path={""} element={<ShelfPage />} />
        <Route path={app.config.router.reading} element={<BookPage />} />
        <Route path={app.config.router.shelf} element={<ShelfPage />} />
        <Route path={app.config.router.settings} element={<SettingsPage />} />
      </Route>
    </Routes>
  </HashRouter>
);
