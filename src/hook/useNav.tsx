import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pop } from "@/component";
import { useAppSelector } from "@/store/store";
import { useTranslation } from "react-i18next";
import {Config} from "a_root";

/** @Description router name */
const router = Config.router;

/** @Description 使用nav router*/
export function useNav() {
  const param = useLocation();
  const nav = useNavigate();
  const { t } = useTranslation();
  const book = useAppSelector((state) => state.book);
  const current = param.pathname.slice(1, param.pathname.length);
  const isReading = current === (router.reading || "");

  useLayoutEffect(Pop.close, [param]);

  const toShelf = () => nav("../" + router.shelf);
  const toSetting = () => nav("../" + router.settings);
  const toReading = () => nav("../" + router.reading);

  return {
    currentName: isReading ? t("shelf") : book.name,
    switchShelfAndReading: () => (isReading ? toShelf() : toReading()),
    toShelf,
    toSetting,
    toReading,
  };
}
