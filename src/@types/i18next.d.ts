import "i18next";
import en from "../locales/en/en.json";

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
    defaultNS: "en";
    resources: {
      en: typeof en;
    };
  }
}
