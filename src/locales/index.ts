import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh from "./zh/zh.json";
import en from "./en/en.json";
import { Language } from "../@types/i18next";

export function i18nInit() {
  i18n
    .use(initReactI18next)
    .init({
      returnNull: false,
      resources: {
        zh: {
          translation: zh,
        },
        en: {
          translation: en,
        },
      },
      lng: localStorage.getItem("language") as Language,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    })
    .then();
}
