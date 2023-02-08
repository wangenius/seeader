import { HashRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Book } from "./Book";
import { Shelf } from "./Shelf";
import { Setting } from "./Setting";
import {Config} from "a_root";

export const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path={""} element={<Book />} />
        <Route path={Config.router.reading} element={<Book />} />
        <Route path={Config.router.shelf} element={<Shelf />} />
        <Route path={Config.router.settings} element={<Setting />} />
      </Route>
    </Routes>
  </HashRouter>
);
