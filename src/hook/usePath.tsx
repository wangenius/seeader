import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pop } from "../component";
import { RouterPath } from "../@constant/variable";
import { useAppSelector } from "../store/store";
import { useTranslation } from "react-i18next";

export function usePath() {
  const param = useLocation();
  const nav = useNavigate();
  const { t } = useTranslation();
  const book = useAppSelector((state) => state.book);
  useLayoutEffect(() => {
    Pop.close();
  }, [param]);
  const isShelf = param.pathname === RouterPath.shelf;
  const isReading = param.pathname === RouterPath.reading;
  const isSetting = param.pathname === RouterPath.setting;

  function switchShelfAndReading() {
    if (isShelf) return nav(RouterPath.reading);
    if (isReading) return nav(RouterPath.shelf);
    if (isSetting) return nav(RouterPath.reading);
  }

  function currentName() {
    if (isShelf) return t("shelf");
    if (isReading) return book.name;
    if (isSetting) return t("settings");
  }

  const toShelf = () => nav(RouterPath.shelf);
  const toSetting = () => nav(RouterPath.setting);
  const toReading = () => nav(RouterPath.reading);

  return {
    currentName: currentName(),
    isShelf,
    isReading,
    isSetting,
    switchShelfAndReading,
    toShelf,
    toSetting,
    toReading,
  };
}
