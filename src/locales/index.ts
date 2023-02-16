import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh from "./zh/zh.json";
import en from "./en/en.json";
import { _sets } from "@/data/method/_sets";

export const i18nInit = () => {
  i18n
    .use(initReactI18next)
    .init({
      returnNull: false,
      resources: {
        zh: { translation: zh },
        en: { translation: en },
      },
      lng: _sets.value().preference.language,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    })
    .then();
};
