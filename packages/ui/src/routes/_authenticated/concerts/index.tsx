import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConcertsList } from './-components/ConcertsList';
import { HeaderActions } from './-components/HeaderActions';

const concertsSearchSchema = z.object({
  order: z.enum(['asc', 'desc']).catch('asc'),
  sortBy: z.enum(['artist', 'date']).catch('date'),
  // TODO: Add filter schema or a search by artist (or both in one)
});

export const Route = createFileRoute('/_authenticated/concerts/')({
  component: RouteComponent,
  validateSearch: (search) => concertsSearchSchema.parse(search),
});

function RouteComponent() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'restricted.concertsList',
  });

  return (
    <main className="p-4 md:px-40 lg:px-52">
      <Card className="mx-auto h-fit max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h1>{t('title')}</h1>
            <HeaderActions />
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <ConcertsList />
        </CardContent>
      </Card>
    </main>
  );
}
