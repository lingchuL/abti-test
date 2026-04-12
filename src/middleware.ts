import { NextResponse, type NextRequest } from 'next/server';

const COUNTRY_LOCALE: Record<string, string> = {
  CN: 'zh-CN', TW: 'zh-CN', HK: 'zh-CN', MO: 'zh-CN',
  PL: 'pl-PL',
};

const EN_COUNTRIES = new Set([
  'US', 'GB', 'AU', 'CA', 'NZ', 'IE', 'ZA', 'SG', 'IN', 'PH', 'MY',
]);

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.cookies.has('abti-geo-locale')) return response;

  const country = request.headers.get('x-vercel-ip-country') ?? '';
  let locale = COUNTRY_LOCALE[country];
  if (!locale && EN_COUNTRIES.has(country)) locale = 'en-US';
  if (!locale) locale = country ? 'en-US' : '';

  if (locale) {
    response.cookies.set('abti-geo-locale', locale, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
