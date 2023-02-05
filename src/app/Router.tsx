import { HashRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Book } from "./Book";
import { Shelf } from "./Shelf";
import { Setting } from "./Setting";
import {APP} from "../@constant";

export const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path={""} element={<Book />} />
        <Route path={APP.router.reading} element={<Book />} />
        <Route path={APP.router.shelf} element={<Shelf />} />
        <Route path={APP.router.settings} element={<Setting />} />
      </Route>
    </Routes>
  </HashRouter>
);
