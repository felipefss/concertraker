import { api } from '@/lib/api';
import { useEffect, useState } from 'react';

export interface Concert {
  id: number;
  artist: string;
  location: string;
  venue: string;
  date: string;
  notes: string;
}

export function useGetConcerts() {
  const [concerts, setConcerts] = useState<Concert[]>([]);

  useEffect(() => {
    api
      .get('/concerts')
      .then((response) => {
        setConcerts(response.data);
      })
      .catch((reason) => console.error(reason));
  }, []);

  return concerts;
}
