// src/shared/i18n/i18n.ts
import { initReactI18next } from "react-i18next";
import i18n from "i18next";

import TRANSLATIONS_EN from "./translations/translation.en.json";
import TRANSLATIONS_RU from "./translations/translation.ru.json";

i18n.use(initReactI18next).init({
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
  keySeparator: false,
  nsSeparator: false,
  react: {
    useSuspense: false,
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ["br", "b"],
  },
  returnEmptyString: false,
  resources: {
    en: {
      translation: TRANSLATIONS_EN,
    },
    ru: {
      translation: TRANSLATIONS_RU,
    },
  },
});

// Добавляем функцию для изменения языка
export const changeLanguage = (languageCode: string) => {
  const language = languageCode === "ru" ? "ru" : "en";
  i18n.changeLanguage(language);
};

export { i18n };
export default i18n;
