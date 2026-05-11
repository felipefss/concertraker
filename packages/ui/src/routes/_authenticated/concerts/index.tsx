import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConcertDialog } from './-components/ConcertDialog';
import { ConcertsList } from './-components/ConcertsList';

export const Route = createFileRoute('/_authenticated/concerts/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useTranslation('translation', {
    keyPrefix: 'restricted.concertsList',
  });

  return (
    <main className="p-4 md:px-40 lg:px-52">
      <Card className="mx-auto h-fit max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h1>{t('title')}</h1>
            <ConcertDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <Button className="btn-teal-outline" variant="outline">
                <PlusIcon size={16} />
              </Button>
            </ConcertDialog>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <ConcertsList />
        </CardContent>
      </Card>
    </main>
  );
}
