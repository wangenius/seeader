import { ThemeProvider } from "../context/ThemeProvider";
import { HashRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Article } from "./Article";
import { Shelf } from "./Shelf";
import { Setting } from "./Setting";

export function Router() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Article />} />
            <Route path="shelf" element={<Shelf />} />
            <Route path="setting" element={<Setting />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
