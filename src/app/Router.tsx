import { HashRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Book } from "./Book";
import { Shelf } from "./Shelf";
import { Settings } from "./Settings";
import {v} from "@/method/v";

export const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path={""} element={<Shelf />} />
        <Route path={v.CONFIG.router.reading} element={<Book />} />
        <Route path={v.CONFIG.router.shelf} element={<Shelf />} />
        <Route path={v.CONFIG.router.settings} element={<Settings />} />
      </Route>
    </Routes>
  </HashRouter>
);
