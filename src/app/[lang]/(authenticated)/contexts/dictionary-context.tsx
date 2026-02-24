'use client';

import { createContext, use } from 'react';
import type { Dictionary } from '../../dictionaries';

const DictionaryContext = createContext<Dictionary | null>(null);

interface DictionaryProviderProps {
  children: React.ReactNode;
  dictionary: Dictionary;
}

export function DictionaryProvider({
  children,
  dictionary,
}: DictionaryProviderProps) {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const context = use(DictionaryContext);

  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }

  return context;
}
