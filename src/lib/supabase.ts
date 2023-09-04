import 'react-native-url-polyfill/auto';
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    deleteItemAsync(key);
  },
};

if (!process.env.EXPO_PUBLIC_SUPABASE_URL || !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Supabase env vars values missing.');
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
