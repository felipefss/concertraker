import { Card, CardContent } from '@/components/ui/card';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';
import { ConcertsHeader } from './components/ConcertsHeader';
import { ConcertsList } from './components/ConcertsList';

export default function Concerts() {
  prefetch(trpc.hello.queryOptions({ text: 'from the client' }));

  return (
    <main className="p-4 md:px-40 lg:px-52">
      <Card className="mx-auto h-fit max-w-xl">
        <HydrateClient>
          <ConcertsHeader />
        </HydrateClient>

        <CardContent className="space-y-4">
          <ConcertsList />
        </CardContent>
      </Card>
    </main>
  );
}
