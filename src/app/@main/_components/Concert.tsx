import { Card, CardContent } from '@/components/ui/card';
import { ConcertField } from './ConcertField';

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

export const Concert = ({
  concert: { artist, date, location, notes, venue },
}: Props) => {
  return (
    <Card className='bg-gray-50 dark:bg-gray-800'>
      <CardContent className='grid grid-cols-3 gap-2 *:even:col-start-3 *:last:col-span-3'>
        <ConcertField label='Artist' value={artist} />

        <ConcertField label='Venue' value={venue} />

        <ConcertField label='Location' value={location} />

        <ConcertField label='Date' value={date.toLocaleDateString()} />

        <ConcertField label='Notes' value={notes} />
      </CardContent>
    </Card>
  );
};
