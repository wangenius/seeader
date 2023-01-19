import { HashRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Book } from "./Book";
import { Shelf } from "./Shelf";
import { Setting } from "./Setting";

export function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Book />} />
          <Route path="shelf" element={<Shelf />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
