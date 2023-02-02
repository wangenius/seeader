import { Header } from "./Header";
import { Container, ModalContainer, PopContainer } from "../component";
import { Outlet } from "react-router-dom";
import { BookProvider } from "../context/BookProvider";
import { ShelfProvider } from "../context/ShelfProvider";
import { ToastContainer } from "react-toastify";

export const App = () => (
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
    <ModalContainer />
    <PopContainer />
    <ShelfProvider>
      <BookProvider>
        <Header />
        <Outlet />
      </BookProvider>
    </ShelfProvider>
  </Container>
);
