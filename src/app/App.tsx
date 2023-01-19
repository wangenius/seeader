import { Header } from "./Header";
import { Container } from "../component/Container";
import { Outlet } from "react-router-dom";
import { BookProvider } from "../context/BookProvider";
import { ShelfProvider } from "../context/ShelfProvider";
import { PopContainer } from "../context/PopContainer";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "../context/ModalProvider";

export const App = () => {
  return (
    <Container cls={"App"}>
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
      />
      <ModalProvider />
        <PopContainer>
          <ShelfProvider>
            <BookProvider>
              <Header />
              <Outlet />
            </BookProvider>
          </ShelfProvider>
        </PopContainer>
    </Container>
  );
};
