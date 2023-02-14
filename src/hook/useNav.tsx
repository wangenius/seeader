import {useLayoutEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Pop} from "@/component";
import {useAppSelector} from "@/data/store";
import {useTranslation} from "react-i18next";
import {app} from "@/method/app";

/** @Description router name */
const router = app.config.router;

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
    static label = isShelf ? t("shelf") : book.name;
    static shelf = () => nav("../" + router.shelf);
    static settings = () => nav("../" + router.settings);
    static reading = () => nav("../" + router.reading);
    static switch = () => (isShelf ? this.reading() : this.shelf());
    static switchSettings = () => (isSettings ? nav(-1) : Nav.settings());
  }

  return Nav;
}
