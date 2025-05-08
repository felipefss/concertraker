import { Section } from '@/app/(index)/_components/Section';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Headphones } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Feature } from './_components/Feature';

export default function Home() {
  return (
    <>
      <header className='border-b px-4 lg:px-6 h-16 flex justify-between items-center'>
        <span className='flex gap-2 font-bold text-xl'>
          <Headphones className='h-6 w-6 text-teal-600 dark:text-teal-400' />
          <span className='dark:text-white'>Concertraker</span>
        </span>

        <nav>
          <Button className='btn-teal' asChild>
            <Link href='#'>Login</Link>
          </Button>
        </nav>
      </header>

      <main>
        <Section className='grid bg-gradient-to-b from-teal-50 to-white dark:from-teal-950/20 dark:to-gray-950 dark:bg-none gap-6 lg:grid-cols-2 lg:gap-12'>
          <div className='flex flex-col space-y-4 justify-center'>
            <h1 className='text-3xl font-bold tracking-tighter md:text-5xl lg:text-6xl/none dark:text-white'>
              Track your concert memories
            </h1>
            <p className='max-w-xl text-gray-500 md:text-xl dark:text-gray-400'>
              Never forget a concert again. Keep track of all the shows
              you&lsquo;ve attended and connect with friends who shared the
              experience.
            </p>
            <div>
              <Button className='btn-teal text-lg p-6' size='lg' asChild>
                <Link href='#'>
                  Get Started
                  <ArrowRight className='h-4 w-4 ml-2' />
                </Link>
              </Button>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <Image
              className='w-full  object-cover overflow-hidden rounded-lg shadow-xl'
              src='/concert-hero.jpg'
              width={550}
              height={450}
              alt='Aerial view of a band playing in a stage for a live audience'
            />
          </div>
        </Section>

        <Section className='bg-teal-50 dark:border-gray-900'>
          <div className='text-center mb-4'>
            <h2 className='text-3xl font-bold tracking-tighter md:text-4xl dark:text-white'>
              Features
            </h2>
            <p className='text-gray-500 dark:text-gray-400 md:text-xl/relaxed'>
              Everything you need to keep track of your concert experiences
            </p>
          </div>

          <div className=''>
            <Feature icon={<Calendar size='2rem' />} title='Track Concerts'>
              Log every concert you attend with dates, venues, and artists.
            </Feature>
          </div>
        </Section>
      </main>
    </>
  );
}
