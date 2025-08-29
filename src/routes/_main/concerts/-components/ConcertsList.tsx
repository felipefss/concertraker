import type { Concert } from '../../../../types/Concert';
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
