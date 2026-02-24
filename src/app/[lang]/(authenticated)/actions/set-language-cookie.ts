'use server';

import { cookies } from 'next/headers';

export async function setLanguageCookie(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365, // 365 days (1 year) = 31536
    name: 'NEXT_LOCALE',
    path: '/',
    sameSite: 'lax',
    value: locale,
  });
}
