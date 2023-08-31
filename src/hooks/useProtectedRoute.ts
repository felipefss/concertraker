import { Session } from '@supabase/supabase-js';
import { router, useSegments } from 'expo-router';
import { useEffect } from 'react';

export function useProtectedRoute(session: Session | null) {
  const segments = useSegments();

  useEffect(() => {
    const isAuthGroup = segments[0] === '(auth)';

    if (!segments.length) {
      return;
    }

    if (!session && !isAuthGroup) {
      router.replace('/sign-in');
    } else if (session && isAuthGroup) {
      router.replace('/home');
    }
  }, [session, segments]);
}
