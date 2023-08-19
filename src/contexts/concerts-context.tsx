import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { FormModel } from '../components/ConcertForm/schema';
import { api } from '@/lib/api';
import { router } from 'expo-router';

interface Concert {
  id: string;
  artist: string;
  location: string;
  venue: string;
  year: string;
  notes: string | null;
}

interface ConcertsContext {
  concerts: Concert[];
  deleteConcert: (id: string) => Promise<void>;
  onAddConcert: (data: FormModel) => Promise<void>;
  onEditConcert: (data: Concert) => Promise<void>;
}

const ConcertsContext = createContext({} as ConcertsContext);

interface Props {
  children: ReactNode;
}

export function ConcertsProvider({ children }: Props) {
  const [concerts, setConcerts] = useState<Concert[]>([]);

  useEffect(() => {
    async function getConcerts() {
      const response = await api.get('/concerts');

      setConcerts(response.data);
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
    const response = await api.delete(`/concerts/${id}`);

    if (response.status === 200) {
      // TODO: Change to 204
      setConcerts((prev) => prev.filter((concert) => concert.id !== id));
    }
  }, []);

  const onAddConcert = useCallback(async (data: FormModel) => {
    const response = await api.post('/concerts', data);

    // TODO: For local dev only. Remove this after
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (response.status === 201) {
      addConcert({ ...data, id: response.data.id });
    }
  }, []);

  const onEditConcert = useCallback(async (data: Concert) => {
    const response = await api.put(`/concerts/${data.id}`, data);

    // TODO: For local dev only. Remove this after
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (response.status === 201) {
      updateConcert(data as Concert);
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
