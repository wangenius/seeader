import { HashRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { BookPage } from "./BookPage";
import { ShelfPage } from "./ShelfPage";
import { SettingsPage } from "./SettingsPage";
import { AppConfig } from "local";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
export const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path={""} element={<BookPage />} />
        <Route path={AppConfig.router.reading} element={<BookPage />} />
        <Route path={AppConfig.router.shelf} element={<ShelfPage />} />
        <Route path={AppConfig.router.settings} element={<SettingsPage />} />
      </Route>
    </Routes>
  </HashRouter>
);
