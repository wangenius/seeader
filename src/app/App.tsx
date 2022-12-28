import { Header } from "./Header";
import { AirDrop, Container } from "../component/Container";
import { AppSx } from "../style/sx";
import { Outlet } from "react-router-dom";
import { BookProvider } from "../context/BookProvider";
import { ShelfProvider } from "../context/ShelfProvider";

const { BrowserWindow, dialog, Menu, MenuItem, getCurrentWindow } =
  window.require("@electron/remote");
const { shell } = window.require("electron");
const fs = window.require("fs");
const iconvLite = window.require("iconv-lite");

export function App() {
  return (
    <Container full flex col sx={AppSx}>
      <ShelfProvider>
        <BookProvider>
          <Header />
          <AirDrop flex sx={{ width: "100%" }}>
            <Outlet />
          </AirDrop>
        </BookProvider>
      </ShelfProvider>
    </Container>
  );
}
