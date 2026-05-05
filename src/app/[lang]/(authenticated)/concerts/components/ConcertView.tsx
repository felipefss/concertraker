'use client';
// TODO: Try to make this a Server Component
// by removing the useState
// and possibly making the delete operation a server action

import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { ContextAwareConfirmation } from 'react-confirm';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/helpers/date';
import { useDictionary } from '../../contexts/dictionary-context';
import type { Concert } from '../models/ConcertModel';
import { ConcertOptions } from './ConcertOptions';
import { ConcertViewField } from './ConcertViewField';

interface Props {
  concert: Concert;
}

export function ConcertView({ concert }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  // const { t } = useTranslation('translation', {
  //   keyPrefix: 'restricted.concertsList.card',
  // });
  const {
    concertsList: { card: cardDict },
  } = useDictionary();

  const { artist, date, location, notes, venue } = concert;
  const formattedDate = formatDate(date, 'shortYearShortMonth');

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
        <>
          <ContextAwareConfirmation.ConfirmationRoot />
          <ConcertOptions concert={concert} onDelete={handleIsDeleting} />
        </>
      )}

      <CardContent className="grid md:grid-cols-[1.5fr_.3fr_1.2fr] gap-2 md:*:even:col-start-3 md:*:last:col-span-3">
        <ConcertViewField label={cardDict.artist} value={artist} />

        <ConcertViewField label={cardDict.venue} value={venue ?? ''} />

        <ConcertViewField label={cardDict.location} value={location} />

        <ConcertViewField label={cardDict.date} value={formattedDate} />

        <ConcertViewField label={cardDict.notes} value={notes ?? ''} />
      </CardContent>
    </Card>
  );
}
