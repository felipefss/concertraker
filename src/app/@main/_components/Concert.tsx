import { Card, CardContent } from '@/components/ui/card';
import { ConcertField } from './ConcertField';

import { ConcertOptions } from './Dropdown';

type Concert = {
  artist: string;
  venue: string;
  location: string;
  date: Date;
  notes: string;
};

interface Props {
  concert: Concert;
}

export function Concert({
  concert: { artist, date, location, notes, venue },
}: Props) {
  return (
    <Card className='bg-gray-50 dark:bg-gray-800 relative'>
      <ConcertOptions />
      <CardContent className='grid grid-cols-[1.5fr_.3fr_1.2fr] gap-2 *:even:col-start-3 *:last:col-span-3'>
        <ConcertField label='Artist' value={artist} />

        <ConcertField label='Venue' value={venue} />

        <ConcertField label='Location' value={location} />

        <ConcertField label='Year' value={date.getUTCFullYear()} />

        <ConcertField label='Notes' value={notes} />
      </CardContent>
    </Card>
  );
}
