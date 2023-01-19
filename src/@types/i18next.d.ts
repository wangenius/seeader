import "i18next";
import zh from "../locales/zh/zh.json";
import en from "../locales/en/en.json";

// react-i18next versions higher than 11.11.0
declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
    defaultNS: "en";
    resources: {
      zh: typeof zh;
      en: typeof en;
    };
  }
}

declare type Language = "zh" | "en";
