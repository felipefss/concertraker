import type { Concert } from '../models/ConcertModel';
import { ConcertView } from './ConcertView';
import { LoadingSpinner } from './LoadingSpinner';

// interface Props {
//   concerts: Concert[];
// }

export function ConcertsList() {
  // TODO: to keep this server component, take a look at using cache tags for this and revalidating it when
  // inserting/deleting/editing
  const concerts = [
    {
      artist: 'Artist 1',
      date: '2021-10-10',
      id: '1',
      location: 'Location 1',
      notes: 'Notes 1',
      venue: 'Venue 1',
    },
    {
      artist: 'Artist 2',
      date: '2021-10-10',
      id: '2',
      location: 'Location 2',
      notes: 'Notes 2',
      venue: 'Venue 2',
    },
  ];

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
