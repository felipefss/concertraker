import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { type NextRequest, NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/concerts(.*)']);

const locales = ['en', 'pt-BR', 'es'];

function getLocale(request: Request) {
  const headers: Record<string, string> = {};
  for (const key of request.headers.keys()) {
    const value = request.headers.get(key);
    if (value) {
      headers[key] = value;
    }
  }

  const languages = new Negotiator({ headers }).languages();
  const defaultLocale = 'en';

  return match(languages, locales, defaultLocale);
}

function resolveLocale(req: NextRequest): string {
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;
  return locales.includes(cookieLocale || '')
    ? (cookieLocale as string)
    : getLocale(req);
}

function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals
  if (pathname.startsWith('/_next')) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`,
  );

  if (pathnameHasLocale) {
    return;
  }
  // Redirect if there is no locale
  const locale = resolveLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Redirect authenticated users away from the landing page
  const { userId } = await auth();
  if (userId) {
    const { pathname } = req.nextUrl;
    const isRootPath =
      pathname === '/' ||
      locales.some((loc) => pathname === `/${loc}` || pathname === `/${loc}/`);

    if (isRootPath) {
      const locale = resolveLocale(req);
      const url = req.nextUrl.clone();
      url.pathname = `/${locale}/concerts`;
      return NextResponse.redirect(url);
    }
  }

  return proxy(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Don't run for API routes
    '/((?!api|trpc).*)',
    // '/(api|trpc)(.*)',
  ],
};
