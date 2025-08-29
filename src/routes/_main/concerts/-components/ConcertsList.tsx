import type { Concert } from '../-models/ConcertModel';
import { ConcertView } from './ConcertView';

interface Props {
  concerts: Concert[];
}

export function ConcertsList({ concerts }: Props) {
  return (
    <>
      {concerts.map((concert) => (
        <ConcertView key={concert.id} concert={concert} />
      ))}
    </>
  );
}
