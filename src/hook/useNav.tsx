import {useLayoutEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Pop} from "@/component";
import {useAppSelector} from "@/data/store";
import {useTranslation} from "react-i18next";
import {AppConfig} from "local";

/** @Description router name */
const router = AppConfig.router;

/** @Description 使用nav router*/
export function useNav() {
  const param = useLocation();
  const nav = useNavigate();
  const { t } = useTranslation();
  const book = useAppSelector((state) => state.book);
  const current = param.pathname.slice(1, param.pathname.length);
  const isShelf = current === (router.shelf || "");
  const isSettings = current === (router.settings || "");

  useLayoutEffect(Pop.close, [param]);

  abstract class Nav {
    static label = isShelf ? book.name : t("shelf");
    static shelf = () => nav("../" + router.shelf);
    static settings = () =>  nav("../" + router.settings);
    static reading = () => nav("../" + router.reading);
    static switch = () => (isShelf ? this.reading() : this.shelf());
    static switchSettings = ()=>isSettings?nav(-1):Nav.settings()
  }

  return Nav;
}
