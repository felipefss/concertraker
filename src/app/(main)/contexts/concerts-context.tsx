import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { FormModel } from '../concert-form/[slug]/schema';
import { api } from '@/lib/api';

type FormAction = 'add' | 'edit';

interface ConcertsContext {
  concerts: Concert[];
  onSubmitForm: (data: FormModel, action: FormAction) => void;
  deleteConcert: (id: string) => Promise<void>;
}

interface Concert {
  id: string;
  artist: string;
  location: string;
  venue: string;
  year: string;
  notes: string | null;
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
  }, []);

  const deleteConcert = useCallback(async (id: string) => {
    const response = await api.delete(`/concerts/${id}`);

    if (response.status === 200) {
      // TODO: Change to 204
      setConcerts((prev) => prev.filter((concert) => concert.id !== id));
    }
  }, []);

  const onSubmitForm = useCallback(async (data: FormModel, action: FormAction) => {
    const response = await api('/concerts', {
      method: action === 'add' ? 'POST' : 'PUT',
      data,
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    if ([200, 201, 204].includes(response.status)) {
      switch (action) {
        case 'add':
          addConcert({ ...data, id: response.data.id });
          break;
        case 'edit':
          if (data.id) {
            updateConcert({ ...data, id: data.id });
          }
          break;
      }
    }
  }, []);

  return (
    <ConcertsContext.Provider
      value={{
        concerts,
        onSubmitForm,
        deleteConcert,
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
