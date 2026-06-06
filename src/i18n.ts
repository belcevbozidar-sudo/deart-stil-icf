import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Locale metadata with display information
export const SUPPORTED_LOCALES = {
  bg: { code: "bg", flagCode: "bg", name: "Bulgarian", nativeName: "Български", dir: "ltr" },
  en: { code: "en", flagCode: "gb", name: "English", nativeName: "English", dir: "ltr" },
  ru: { code: "ru", flagCode: "ru", name: "Russian", nativeName: "Русский", dir: "ltr" },
  pl: { code: "pl", flagCode: "pl", name: "Polish", nativeName: "Polski", dir: "ltr" },
  it: { code: "it", flagCode: "it", name: "Italian", nativeName: "Italiano", dir: "ltr" },
  es: { code: "es", flagCode: "es", name: "Spanish", nativeName: "Español", dir: "ltr" },
  fr: { code: "fr", flagCode: "fr", name: "French", nativeName: "Français", dir: "ltr" },
  pt: { code: "pt", flagCode: "pt", name: "Portuguese", nativeName: "Português", dir: "ltr" },
} as const;

// Default locale
export const DEFAULT_LOCALE: keyof typeof SUPPORTED_LOCALES = "bg";

// Derived constants
export const SUPPORTED_LOCALES_ARRAY = Object.keys(SUPPORTED_LOCALES) as Array<
  keyof typeof SUPPORTED_LOCALES
>;
export type SupportedLocale = keyof typeof SUPPORTED_LOCALES;

export function isSupportedLocale(locale: string | undefined): locale is SupportedLocale {
  return !!locale && SUPPORTED_LOCALES_ARRAY.includes(locale as SupportedLocale);
}

// Saved locale from localStorage
export const SAVED_LOCALE =
  typeof window !== "undefined"
    ? (() => {
        try {
          const stored = localStorage.getItem("locale");
          return stored && isSupportedLocale(stored) ? stored : null;
        } catch {
          return null;
        }
      })()
    : null;

export const SAVED_OR_DEFAULT_LOCALE: SupportedLocale = SAVED_LOCALE ?? DEFAULT_LOCALE;

// Set locale in path
export function setLocaleInPath(
  locale: string,
  pathname: string,
  search: string = "",
  hash: string = "",
): string {
  const targetLocale = isSupportedLocale(locale) ? locale : SAVED_OR_DEFAULT_LOCALE;

  if (pathname === "/") {
    return `/${targetLocale}${search}${hash}`;
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const firstSegmentLowercase = firstSegment?.toLowerCase();

  if (firstSegmentLowercase && isSupportedLocale(firstSegmentLowercase)) {
    segments[0] = targetLocale;
    return `/${segments.join("/")}${search}${hash}`;
  }

  return `/${targetLocale}${pathname}${search}${hash}`;
}

// Change locale and update document attributes
export async function changeLocale(lng: SupportedLocale) {
  try {
    await i18n.changeLanguage(lng);
    const localeMetadata = SUPPORTED_LOCALES[lng];
    document.documentElement.lang = lng;
    document.documentElement.dir = localeMetadata.dir ?? "ltr";

    try {
      localStorage.setItem("locale", lng);
    } catch {
      // localStorage might be disabled
    }
  } catch (error) {
    console.error("Failed to change locale:", error);
    throw error;
  }
}

// Eagerly import all translation files
const translationModules = import.meta.glob<{ default: Record<string, string> }>(
  "./locales/*/*.json",
  { eager: true },
);

// Build resources object
const resources: Record<string, Record<string, Record<string, string>>> = {};

for (const [path, module] of Object.entries(translationModules)) {
  const match = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/);
  if (match) {
    const [, lng, ns] = match;
    if (!resources[lng]) {
      resources[lng] = {};
    }
    resources[lng][ns] = module.default;
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: SAVED_OR_DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: SUPPORTED_LOCALES_ARRAY,
  defaultNS: "common",
  interpolation: { escapeValue: false },
  react: { useSuspense: true },
});

export default i18n;
