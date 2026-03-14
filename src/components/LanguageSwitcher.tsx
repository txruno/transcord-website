"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/lib/locales";

const locales = [...SUPPORTED_LOCALES];
const localeLabels = {
	"bg": "български",
	"zh-CN": "中文",
	"zh-TW": "繁體",
	"hr": "hrvatski",
	"cs": "čeština",
	"da": "dansk",
	"nl": "Nederlands",
	"en": "English",
	"en-GB": "EnglishGB",
	"en-US": "EnglishUS",
	"fi": "suomi",
	"fr": "français",
	"de": "Deutsch",
	"el": "Ελληνικά",
	"hi": "हिंदी",
	"hu": "magyar",
	"id": "Bahasa Indonesia",
	"it": "Italiano",
	"ja": "日本語",
	"ko": "한국어",
	"lt": "Lietuvių",
	"no": "norsk",
	"pl": "polski",
	"pt-BR": "PortuguêsBR",
	"ro": "Română",
	"ru": "Русский",
	"es-ES": "EspañolES",
	"es-419": "EspañolLATAM",
	"sv-SE": "Svenska",
	"th": "ไทย",
	"tr": "Türkçe",
	"uk": "Українська",
	"vi": "Tiếng Việt"
}

function resolveLocaleFromPath(pathname: string): string {
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0 && locales.includes(pathSegments[0] as typeof locales[number])) {
    return pathSegments[0];
  }

  return DEFAULT_LOCALE;
}

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState(() => resolveLocaleFromPath(pathname));

  useEffect(() => {
    setCurrentLocale(resolveLocaleFromPath(pathname));
  }, [pathname]);

  const handleChange = (value: string) => {
    const newLocale = value;
    setCurrentLocale(newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    const pathSegments = pathname.split('/').filter(Boolean);
    const hasLocalePrefix = pathSegments.length > 0 && locales.includes(pathSegments[0] as typeof locales[number]);
    const remainingPath = hasLocalePrefix ? pathSegments.slice(1) : pathSegments;
    const suffix = remainingPath.length > 0 ? `/${remainingPath.join('/')}` : '';
    const newPath = `/${newLocale}${suffix}`;

    router.push(newPath);
  };

  if (!currentLocale) return null;
  return (
    <Select onValueChange={handleChange} value={currentLocale}>
      <SelectTrigger className="w-auto" aria-label="Select Language">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="backdrop-blur-sm bg-gray-900/75 text-white border-white/10">
        {locales.map((locale) => (
        <SelectItem key={locale} value={locale}>{localeLabels[locale as keyof typeof localeLabels] || locale}</SelectItem>
      ))}
      </SelectContent>
    </Select>
  )
}
