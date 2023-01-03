import { Header } from "./Header";
import { Container } from "../component/Container";
import { Outlet } from "react-router-dom";
import { BookProvider } from "../context/BookProvider";
import { ShelfProvider } from "../context/ShelfProvider";
import { SnackbarProvider } from "notistack";
import { useRef } from "react";
import { useTheme } from "../context/ThemeProvider";
import { useWindows } from "../hook/useWindows";
import { PopProvider } from "../context/PopProvider";
import { AppSx, HEIGHT_VALUE } from "../constant/theme";

export function App() {
  const snackbarRef: any = useRef();
  const { theme } = useTheme();
  const { y } = useWindows();
  const bodyStyle = { width: "100%", height: y - HEIGHT_VALUE.HEADER };
  const SNACK_STYLE = {
    width: "fit-content",
    minWidth: "unset",
    paddingRight: 24,
    boxShadow: theme.shadows.box.hover,
    paddingTop: 0,
    paddingBottom: 0,
  };
  return (
    <Container full flexLayout col sx={AppSx}>
      <SnackbarProvider
        maxSnack={2}
        ref={snackbarRef}
        style={SNACK_STYLE}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <PopProvider>
          <ShelfProvider>
            <BookProvider>
              <Header />
              <Container sx={bodyStyle}>
                <Outlet />
              </Container>
            </BookProvider>
          </ShelfProvider>
        </PopProvider>
      </SnackbarProvider>
    </Container>
  );
}
