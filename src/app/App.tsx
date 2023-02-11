import { Header } from "./Header";
import { ModalContainer, Once, PopContainer } from "@/component";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { TipContainer } from "@/component/Tip";
import { i18nInit } from "@/locales";

export const App = () => {
  i18nInit();

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
