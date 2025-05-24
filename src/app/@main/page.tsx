import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Concert } from './_components/Concert';
import { NewConcertDialog } from './_components/NewConcertDialog';

const concerts = [
  {
    id: '8f4e2a1c',
    artist: 'Joe Bonamassa',
    venue: 'Royal Albert Hall',
    location: 'London, UK',
    date: new Date('2022-05-15'),
    notes:
      'Unforgettable blues performance with special guests. Amazing guitar solos throughout the night.',
  },
  {
    id: 'b9d7c3e5',
    artist: 'Coldplay',
    venue: 'Wembley Stadium',
    location: 'London, UK',
    date: new Date('2022-08-20'),
    notes:
      'Spectacular light show and crowd interaction. The band played all their greatest hits.',
  },
  {
    id: 'a2f8e4d1',
    artist: 'Adele',
    venue: 'Madison Square Garden',
    location: 'New York, USA',
    date: new Date('2022-10-07'),
    notes:
      'Emotional performance with stunning vocals. The acoustic segment was particularly moving.',
  },
  {
    id: 'c6b5a9d3',
    artist: 'Metallica',
    venue: 'Estadio Nacional',
    location: 'Santiago, Chile',
    date: new Date('2022-04-27'),
    notes:
      'High-energy metal show with an incredible crowd response. The band played for over 2 hours.',
  },
  {
    id: 'e7d2f1b8',
    artist: 'Iron Maiden',
    venue: 'Rock in Rio',
    location: 'Rio de Janeiro, Brazil',
    date: new Date('2022-09-02'),
    notes:
      "Legendary metal performance with elaborate stage setup and Eddie appearances. The crowd went wild during 'The Trooper'.",
  },
];

export default function Main() {
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
          {concerts.map((concert) => (
            <Concert key={concert.id} concert={concert} />
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
