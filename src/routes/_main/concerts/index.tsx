import type { Concert } from '@/types/Concert';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { ConcertDialog } from './-components/ConcertDialog';
import { ConcertsList } from './-components/ConcertsList';

export const Route = createFileRoute('/_main/concerts/')({
  component: RouteComponent,
  loader: async (): Promise<Concert[]> => {
    const fetchResp = await fetch('http://localhost:3000/concerts');
    return await fetchResp.json();
  },
});

function RouteComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const concerts = Route.useLoaderData();

  return (
    <main className='p-4 grid grid-cols-3'>
      <Card className='col-start-2 h-fit'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <h1>My Concerts History</h1>
            <ConcertDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <Button className='btn-teal-outline' variant='outline'>
                Add new
              </Button>
            </ConcertDialog>
          </CardTitle>
        </CardHeader>

        <CardContent className='space-y-4'>
          <Suspense fallback='Loading...'>
            <ConcertsList concerts={concerts} />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}
