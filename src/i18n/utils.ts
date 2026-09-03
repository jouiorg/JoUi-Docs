import { en, type TranslationKey } from './en';
import { ro } from './ro';

const translations = { en, ro } as const;

export type Locale = keyof typeof translations;

export function useTranslations(locale: Locale) {
  return function t(key: TranslationKey): string {
    return translations[locale][key] ?? translations['en'][key] ?? key;
  };
}
