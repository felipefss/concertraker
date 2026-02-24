import type { Locale } from '@/app/[lang]/dictionaries';

const localesMapping = {
  en: () => import('@clerk/localizations').then((m) => m.enUS),
  es: () => import('@clerk/localizations').then((m) => m.esES),
  'pt-BR': () => import('@clerk/localizations').then((m) => m.ptBR),
};

export async function getClerkLocales(language: Locale) {
  return localesMapping[language]();
}
