import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Main() {
  return (
    <main className='p-4 grid grid-cols-3'>
      <Card className='col-start-2 h-fit'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <h1>My Concerts History</h1>
            <Button className='btn-teal-outline' variant='outline'>
              Add new
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className='space-y-4'>
          <Card className='bg-gray-50 dark:bg-gray-800'>
            <CardContent className='grid grid-cols-3 gap-2 *:even:col-start-3 *:last:col-span-3'>
              <div>
                <label className='text-lg font-medium dark:text-white'>
                  Artist
                </label>
                <p className='text-gray-500 dark:text-gray-400'>
                  Joe Bonamassa
                </p>
              </div>

              <div>
                <p>Venue</p>
                <p className=' text-gray-500 dark:text-gray-400'>
                  Royal Albert Hall
                </p>
              </div>

              <div>
                <p>Location</p>
                <p className=' text-gray-500 dark:text-gray-400'>London, UK</p>
              </div>

              <div>
                <p>Date</p>
                <span className='text-gray-500 dark:text-gray-400'>
                  May 15, 2022
                </span>
              </div>

              <div>
                <p>Notes</p>
                <p className=' text-gray-500 dark:text-gray-400'>
                  Unforgettable Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Saepe nesciunt laborum molestiae ullam
                  assumenda odio eligendi quibusdam neque hic, magni harum,
                  cupiditate, asperiores voluptatum magnam aut optio? Quibusdam,
                  qui veritatis.
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </main>
  );
}
