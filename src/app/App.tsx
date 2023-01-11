import { Header } from "./Header";
import { Container } from "../component/Container";
import { Outlet } from "react-router-dom";
import { BookProvider } from "../context/BookProvider";
import { ShelfProvider } from "../context/ShelfProvider";
import { useWindows } from "../hook/useWindows";
import { PopProvider } from "../context/PopProvider";
import { THEME_CONSTANT } from "../@constant/theme";
import { ToastContainer } from "react-toastify";
import { useTheme } from "../context/ThemeProvider";
import { ModalProvider } from "../context/ModalProvider";

export function App() {
  const { win_height } = useWindows();
  const bodyStyle = {
    width: "100%",
    height: win_height - THEME_CONSTANT.HEIGHT_VALUE.HEADER,
  };
  const { theme } = useTheme();
  const AppSx: Style.SXs = [
    {
      backgroundColor: theme.default.backgroundColor?.default,
      height: "100vh",
      width: "100vw",
      maxWidth: "100vw",
      maxHeight: "100vh",
      overflow: "hidden",
      position: "relative",
    },
  ];

  return (
    <Container full flexLayout col sx={AppSx}>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        limit={3}
        closeButton={false}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.name === "default" ? "colored" : "dark"}
      />
      <ModalProvider>
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
      </ModalProvider>
    </Container>
  );
}
