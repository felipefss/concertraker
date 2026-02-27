'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDictionary } from '../contexts/dictionary-context';
import { ConcertDialog } from './components/ConcertDialog';
import { ConcertsList } from './components/ConcertsList';

export default function Concerts() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { concertsList } = useDictionary();

  return (
    <main className="p-4 md:px-40 lg:px-52">
      <Card className="mx-auto h-fit max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h1>{concertsList.title}</h1>
            <ConcertDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <Button className="btn-teal-outline" variant="outline">
                {concertsList.addNewButton}
              </Button>
            </ConcertDialog>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* {concerts ? <ConcertsList concerts={concerts} /> : <LoadingSpinner />} */}
          <ConcertsList />
        </CardContent>
      </Card>
    </main>
  );
}
