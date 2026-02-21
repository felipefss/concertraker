import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { type NextRequest, NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/concerts(.*)']);

const locales = ['en', 'pt-BR', 'es'];

function getLocale(request: Request) {
  // const headers = { 'accept-language': 'en-US,en;q=0.5' };
  const headers: Record<string, string> = {};
  for (const key of request.headers.keys()) {
    const value = request.headers.get(key);
    if (value) {
      headers[key] = value;
    }
  }

  const languages = new Negotiator({ headers }).languages();
  const defaultLocale = 'en-US';

  return match(languages, locales, defaultLocale);
}

function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`,
  );

  if (pathnameHasLocale) {
    return;
  }

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  return proxy(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
