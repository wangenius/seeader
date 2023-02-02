import "i18next";
import zh from "../locales/zh/zh.json";
import en from "../locales/en/en.json";

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
