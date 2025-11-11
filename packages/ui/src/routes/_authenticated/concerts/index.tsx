import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConcertDialog } from './-components/ConcertDialog';
import { ConcertsList } from './-components/ConcertsList';
import { getConcerts } from './-queryFns/get-concerts';

export const Route = createFileRoute('/_authenticated/concerts/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: concerts } = useQuery({
    queryFn: getConcerts,
    queryKey: ['get-concerts'],
  });

  return (
    <main className="p-4 grid grid-cols-3">
      <Card className="col-start-2 h-fit">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h1>My Concerts History</h1>
            <ConcertDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <Button className="btn-teal-outline" variant="outline">
                Add new
              </Button>
            </ConcertDialog>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {concerts ? <ConcertsList concerts={concerts} /> : <p>Loading...</p>}
        </CardContent>
      </Card>
    </main>
  );
}
