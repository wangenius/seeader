import { Header } from "./Header";
import { ModalContainer, Once, PopContainer } from "@/component";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { TipContainer } from "@/component/Tip";
import { i18nInit } from "@/locales";
import { _book } from "@/data";
import { useAppSelector } from "@/data/store";
import { useEffect } from "react";

export const App = () => {
  // i18nInit();
  const book = useAppSelector((state) => state.book);
  useEffect(() => {
    if (book._id === "") _book.close();
  }, [book]);
  return (
    <Once cs={"App"}>
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
      <TipContainer />
      <Header />
      <Outlet />
    </Once>
  );
};
