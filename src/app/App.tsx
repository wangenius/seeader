import { Header } from "./Header";
import { ModalContainer, Once, PopContainer } from "@/component";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { TipContainer } from "@/component/Tip";
import { _book, _sets } from "@/data";
import { useAppSelector } from "@/data/store";
import { useEffect } from "react";
import i18next from "i18next";

export const App = () => {
  const book = useAppSelector((state) => state.book);
  useEffect(() => {
    if (book._id === "") _book.close();
  }, [book]);
  useEffect(() => {
    i18next.changeLanguage(_sets.value().preference.language).then()
  }, []);
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
