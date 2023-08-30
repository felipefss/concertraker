import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface AuthContextProps {
  session: Session | null;
  signUpWithEmail: (email: string, password: string, name: string) => void;
  signInWithEmail: (email: string, password: string) => void;
}

const AuthContext = createContext({} as AuthContextProps);

interface ProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: ProviderProps) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function signUpWithEmail(email: string, password: string, name: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
    }
  }

  async function signInWithEmail(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        signUpWithEmail,
        signInWithEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('No AuthContext provided!');
  }

  return context;
}
