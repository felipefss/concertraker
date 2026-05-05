'use client';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import type { Concert } from '../models/ConcertModel';
import { ConcertView } from './ConcertView';
import { LoadingSpinner } from './LoadingSpinner';

// interface Props {
//   concerts: Concert[];
// }

export function ConcertsList() {
  const trpc = useTRPC();
  const { data: concerts } = useQuery(trpc.concerts.getAll.queryOptions());

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
