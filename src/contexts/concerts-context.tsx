import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import uuid from 'react-native-uuid';

import { FormModel } from '../components/ConcertForm/schema';

import { supabase } from '@/lib/supabase';

interface Concert {
  id: string;
  artist: string;
  location: string;
  venue: string;
  date: string;
  notes: string | null;
}

interface ConcertsContext {
  concerts: Concert[];
  deleteConcert: (id: string) => Promise<void>;
  onAddConcert: (data: FormModel) => Promise<void>;
  onEditConcert: (data: FormModel) => Promise<void>;
}

const ConcertsContext = createContext({} as ConcertsContext);

interface Props {
  children: ReactNode;
}

export function ConcertsProvider({ children }: Props) {
  const [concerts, setConcerts] = useState<Concert[]>([]);

  useEffect(() => {
    async function getConcerts() {
      const response = await supabase.from('concerts').select('id, artist, location, venue, date, notes');

      setConcerts(response.data ?? []);
    }

    getConcerts();
  }, []);

  const addConcert = useCallback((data: Concert) => {
    setConcerts((prev) => [...prev, data]);
    router.back();
  }, []);

  const updateConcert = useCallback((data: Concert) => {
    setConcerts((prev) =>
      prev.map((concert) => {
        if (concert.id === data.id) {
          return data;
        }

        return concert;
      })
    );
    router.back();
  }, []);

  const deleteConcert = useCallback(async (id: string) => {
    const response = await supabase.from('concerts').delete().eq('id', id);

    if (response.status === 204) {
      setConcerts((prev) => prev.filter((concert) => concert.id !== id));
    }
  }, []);

  const onAddConcert = useCallback(async (data: FormModel) => {
    const newConcertID = uuid.v4() as string;
    const response = await supabase.from('concerts').insert({ ...data, id: newConcertID });

    if (response.status === 201) {
      addConcert({ ...data, id: newConcertID });
    }
  }, []);

  const onEditConcert = useCallback(async (data: FormModel) => {
    if (data.id) {
      const response = await supabase.from('concerts').update(data).eq('id', data.id);

      if (response.status === 204) {
        updateConcert(data as Concert);
      }
    } else {
      throw new Error('No concert ID provided.');
    }
  }, []);

  return (
    <ConcertsContext.Provider
      value={{
        concerts,
        deleteConcert,
        onAddConcert,
        onEditConcert,
      }}
    >
      {children}
    </ConcertsContext.Provider>
  );
}

export function useConcertsContext() {
  const context = useContext(ConcertsContext);

  if (!context) {
    throw new Error('No Concerts context provided!');
  }

  return context;
}
