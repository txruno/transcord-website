import { NextResponse, NextRequest } from "next/server"
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/lib/locales";

const SUPPORTED_LOCALE_LOOKUP = new Map(
  SUPPORTED_LOCALES.map((locale) => [locale.toLowerCase(), locale])
);

function parseAcceptLanguageHeader(header: string | null): { code: string; q: number }[] {
  if (!header) {
    return [];
  }

  return header
    .split(',')
    .map(langEntry => {
      const parts = langEntry.trim().split(';q=');
      const code = parts[0].trim();
      const q = parts[1] ? parseFloat(parts[1]) : 1.0;
      if (isNaN(q)) {
        return null;
      }
      return { code, q };
    })
    .filter((lang): lang is { code: string; q: number } => lang !== null && lang.code !== '')
    .sort((a, b) => b.q - a.q);
}

function resolvePreferredLocale(languageTag: string): string | null {
  const lowered = languageTag.toLowerCase();
  const exactMatch = SUPPORTED_LOCALE_LOOKUP.get(lowered);
  if (exactMatch) {
    return exactMatch;
  }

  const baseTag = lowered.split("-")[0];
  const baseMatch = SUPPORTED_LOCALE_LOOKUP.get(baseTag);
  if (baseMatch) {
    return baseMatch;
  }

  return null;
}

export function middleware(request: NextRequest) {
  const { pathname, search, origin } = request.nextUrl;
  const response = NextResponse.next();

  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/assets/') ||
    pathname.match(
      /\.(ico|png|jpg|jpeg|gif|svg|webp|txt|xml|json|webmanifest|js|css|map|woff|woff2|ttf|eot)$/i
    )
  ) {
    return response;
  }

  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return response;
  }

  const acceptLanguageHeader = request.headers.get('accept-language');
  let preferredLanguage = DEFAULT_LOCALE;

  if (acceptLanguageHeader) {
    const parsedLangs = parseAcceptLanguageHeader(acceptLanguageHeader);
    if (parsedLangs.length > 0) {
      for (const lang of parsedLangs) {
        const matchedLocale = resolvePreferredLocale(lang.code);
        if (matchedLocale) {
          preferredLanguage = matchedLocale;
          break;
        }
      }
    }
  }

  let newPath = `/${preferredLanguage}`;
  if (pathname !== '/') {
    newPath += pathname;
  }

  const redirectUrl = new URL(newPath, origin);
  redirectUrl.search = search;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml|sw.js|manifest.json).*)',
  ],
};