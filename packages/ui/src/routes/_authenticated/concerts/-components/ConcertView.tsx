import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/helpers/date';
import type { Concert } from '../-models/ConcertModel';
import { ConcertOptions } from './ConcertOptions';
import { ConcertViewField } from './ConcertViewField';

interface Props {
  concert: Concert;
}

export function ConcertView({ concert }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { t } = useTranslation('translation', {
    keyPrefix: 'restricted.concertsList.card',
  });

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
        <ConcertOptions concert={concert} onDelete={handleIsDeleting} />
      )}

      <CardContent className="grid md:grid-cols-[1.5fr_.3fr_1.2fr] gap-2 md:*:even:col-start-3 md:*:last:col-span-3">
        <ConcertViewField label={t('artist')} value={artist} />

        <ConcertViewField label={t('venue')} value={venue} />

        <ConcertViewField label={t('location')} value={location} />

        <ConcertViewField label={t('date')} value={formattedDate} />

        <ConcertViewField label={t('notes')} value={notes} />
      </CardContent>
    </Card>
  );
}
