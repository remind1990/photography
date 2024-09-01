'use server';
import { cookies, headers } from 'next/headers';
import { Locale, defaultLocale, locales } from '@/config';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  const cookieLocale = cookies().get(COOKIE_NAME)?.value as Locale;

  // If a locale is set in the cookies, use it
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Fallback to the Accept-Language header from the request
  const acceptLanguage = headers().get('accept-language');
  if (acceptLanguage) {
    const preferredLanguages = acceptLanguage
      .split(',')
      .map((lang) => lang.trim());
    for (const lang of preferredLanguages) {
      if (lang.startsWith('uk') || lang.startsWith('ru')) {
        return 'ua' as Locale;
      }
      if (lang.startsWith('en')) {
        return 'en' as Locale;
      }
    }
  }

  // Fallback to defaultLocale if no matching language is found
  return defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale);
}
