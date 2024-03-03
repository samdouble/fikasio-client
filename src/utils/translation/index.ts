import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en';
import frTranslation from './fr';

const defaultLanguage = 'en';
const resources = {
  en: {
    translation: enTranslation,
  },
  fr: {
    translation: frTranslation,
  },
};

export function getLanguage(): string {
  return localStorage.getItem('language') || defaultLanguage;
}

export function initializeTranslation(): void {
  const language: string = getLanguage();
  const acceptedLanguages = ['en', 'fr'];
  const selectedLanguage = language && acceptedLanguages.includes(language)
    ? language
    : defaultLanguage;
  i18n.use(initReactI18next).init({
    resources,
    lng: selectedLanguage,
    fallbackLng: selectedLanguage,
    interpolation: {
      escapeValue: false,
    },
  });
}

export function setLanguage(language: string): void {
  i18n.changeLanguage(language);
  localStorage.setItem('language', language);
}
