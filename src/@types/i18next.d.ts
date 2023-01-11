import "i18next";
import zh from "../local/zh/zh.json";
import en from "../local/en/en.json";

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
