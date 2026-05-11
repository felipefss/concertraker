import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import { queries } from '@/constants';
import { useApi } from '@/hooks/useApi';
import { Route } from '..';
import { getConcerts } from '../-queryFns/get-concerts';
import { ConcertView } from './ConcertView';
import { LoadingSpinner } from './LoadingSpinner';

export function ConcertsList() {
  const api = useApi();

  const { sortBy, order } = useSearch({ from: Route.id });

  const { data: concerts } = useQuery({
    queryFn: () => getConcerts(api),
    queryKey: [queries.GET_CONCERTS],
  });

  const sortedConcerts = useMemo(() => {
    if (!concerts) return null;

    return concerts.toSorted((a, b) => {
      const isAsc = order === 'asc' ? 1 : -1;

      if (sortBy === 'artist') {
        return a.artist.localeCompare(b.artist) * isAsc;
      }

      return (new Date(a.date).getTime() - new Date(b.date).getTime()) * isAsc;
    });
  }, [concerts, order, sortBy]);

  if (!sortedConcerts) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {sortedConcerts.map((concert) => (
        <ConcertView concert={concert} key={concert.id} />
      ))}
    </>
  );
}
