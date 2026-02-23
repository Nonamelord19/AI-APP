export const supportedLangs = ["uk", "en", "ru"] as const;

export type Lang = (typeof supportedLangs)[number];

export function getLang(langParam?: string | null): Lang {
  if (!langParam) return "uk";
  return (supportedLangs as readonly string[]).includes(langParam) ? (langParam as Lang) : "uk";
}

export type LocalizedText = Record<Lang, string>;

export function t(localized: LocalizedText, lang: Lang): string {
  return localized[lang] ?? localized.uk;
}
