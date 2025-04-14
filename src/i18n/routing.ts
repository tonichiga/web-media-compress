import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'uk', 'ru'] as const;

export const defaultLocale = 'en' as const;

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
});