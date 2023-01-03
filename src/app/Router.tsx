import { ThemeProvider } from "../context/ThemeProvider";
import { HashRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Article } from "./Article";
import { Shelf } from "./Shelf";
import { LoadingProvider } from "../context/LoadingProvider";

export function Router() {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="" element={<Article />} />
              <Route path="shelf" element={<Shelf />} />
            </Route>
          </Routes>
        </HashRouter>
      </LoadingProvider>
    </ThemeProvider>
  );
}
