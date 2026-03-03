'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { useDictionary } from '../../contexts/dictionary-context';
import { ConcertDialog } from './ConcertDialog';

export function ConcertsHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { concertsList } = useDictionary();

  return (
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
  );
}
