import { ThemeProvider } from "../context/ThemeProvider";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Header } from "./Header";
import { Article } from "./Article";
import { Shelf } from "./Shelf";

export function Router() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Article />} />
            <Route path="shelf" element={<Shelf />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
