import { useQuery } from '@tanstack/react-query';
import { queries } from '@/constants';
import { useApi } from '@/hooks/useApi';
import { getConcerts } from '../-queryFns/get-concerts';
import { ConcertView } from './ConcertView';
import { LoadingSpinner } from './LoadingSpinner';

export function ConcertsList() {
  const api = useApi();

  const { data: concerts } = useQuery({
    queryFn: () => getConcerts(api),
    queryKey: [queries.GET_CONCERTS],
  });

  if (!concerts) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {concerts.map((concert) => (
        <ConcertView concert={concert} key={concert.id} />
      ))}
    </>
  );
}
