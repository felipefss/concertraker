import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/helpers/date';
import type { Concert } from '../-models/ConcertModel';
import { ConcertField } from './ConcertField';
import { ConcertOptions } from './ConcertOptions';

interface Props {
  concert: Concert;
}

export function ConcertView({ concert }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { artist, date, location, notes, venue } = concert;
  const formattedDate = formatDate(date, 'shortYear');

  const handleIsDeleting = (value: boolean) => {
    setIsDeleting(value);
  };

  return (
    <Card className="bg-gray-50 dark:bg-gray-800 relative">
      {isDeleting ? (
        <LoaderCircle
          className="animate-spin absolute right-2 top-2"
          color="teal"
          size={20}
        />
      ) : (
        <ConcertOptions concert={concert} onDelete={handleIsDeleting} />
      )}

      <CardContent className="grid grid-cols-[1.5fr_.3fr_1.2fr] gap-2 *:even:col-start-3 *:last:col-span-3">
        <ConcertField label="Artist" value={artist} />

        <ConcertField label="Venue" value={venue} />

        <ConcertField label="Location" value={location} />

        <ConcertField label="Year" value={formattedDate} />

        <ConcertField label="Notes" value={notes} />
      </CardContent>
    </Card>
  );
}
