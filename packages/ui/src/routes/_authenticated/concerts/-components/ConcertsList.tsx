import type { Concert } from '../-models/ConcertModel';
import { ConcertView } from './ConcertView';

interface Props {
  concerts: Concert[];
}

export function ConcertsList({ concerts }: Props) {
  console.log(concerts);

  return (
    <>
      {concerts.map((concert) => (
        <ConcertView concert={concert} key={concert.id} />
      ))}
    </>
  );
}
