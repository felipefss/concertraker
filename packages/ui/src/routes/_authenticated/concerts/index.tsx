import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { queries } from '@/constants';
import { useApi } from '@/hooks/useApi';
import { ConcertDialog } from './-components/ConcertDialog';
import { ConcertsList } from './-components/ConcertsList';
import { LoadingSpinner } from './-components/LoadingSpinner';
import { getConcerts } from './-queryFns/get-concerts';

export const Route = createFileRoute('/_authenticated/concerts/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useTranslation('translation', {
    keyPrefix: 'restricted.concertsList',
  });
  const api = useApi();

  const { data: concerts } = useQuery({
    queryFn: () => getConcerts(api),
    queryKey: [queries.GET_CONCERTS],
  });

  return (
    <main className="p-4 md:px-40 lg:px-52">
      <Card className="mx-auto h-fit max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h1>{t('title')}</h1>
            <ConcertDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <Button className="btn-teal-outline" variant="outline">
                {t('addNewButton')}
              </Button>
            </ConcertDialog>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {concerts ? <ConcertsList concerts={concerts} /> : <LoadingSpinner />}
        </CardContent>
      </Card>
    </main>
  );
}
