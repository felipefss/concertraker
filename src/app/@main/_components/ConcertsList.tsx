'use client';

import { use } from 'react';

import type { Concert } from '../constants';
import { ConcertView } from './ConcertView';

interface Props {
  concerts: Promise<Concert[]>;
}

export function ConcertsList({ concerts }: Props) {
  const concertList = use(concerts);

  return (
    <>
      {concertList.map((concert) => (
        <ConcertView key={concert.id} concert={concert} />
      ))}
    </>
  );
}
