import { Suspense } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { ConcertsList } from './_components/ConcertsList';
import { NewConcertDialog } from './_components/NewConcertDialog';

import { getConcerts } from './actions';

export default function Main() {
  const concerts = getConcerts();

  return (
    <main className='p-4 grid grid-cols-3'>
      <Card className='col-start-2 h-fit'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <h1>My Concerts History</h1>
            <NewConcertDialog />
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
