import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import concertHeroUrl from '@/assets/concert-hero.jpg';
import { Header } from '@/components/Header';
import { Feature } from '@/components/landing/Feature';
import { Section } from '@/components/landing/Section';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  beforeLoad: async ({ context }) => {
    if (context.auth?.isLoaded && context.auth.isSignedIn) {
      throw redirect({
        to: '/concerts',
      });
    }
  },
  component: Index,
});

function Index() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'no_auth.landing',
  });
  const currentYear = new Date().getFullYear();

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <Header>
        <nav className="flex gap-4">
          <Button asChild className="btn-teal">
            <Link to="/sign-in">{t('signInButton')}</Link>
          </Button>

          <Button asChild className="btn-teal-outline" variant="outline">
            <Link to="/sign-up">{t('signUpButton')}</Link>
          </Button>
        </nav>
      </Header>

      <main>
        <Section className="grid bg-gradient-to-b from-teal-50 to-white dark:from-teal-950/20 dark:to-gray-950 dark:bg-none gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col space-y-4 items-center lg:items-baseline">
            <h1 className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-6xl/none dark:text-white">
              {t('title')}
            </h1>
            <p className="max-w-xl text-gray-500 md:text-xl dark:text-gray-400">
              {t('subtitle')}
            </p>
            <div>
              <Button asChild className="btn-teal text-lg p-6" size="lg">
                <Link to=".">
                  {t('getStartedButton')}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              alt={t('heroImgAlt')}
              className="w-auto lg:w-full object-cover overflow-hidden rounded-lg shadow-xl"
              height={450}
              src={concertHeroUrl}
              width={550}
            />
          </div>
        </Section>

        <Section className="bg-teal-50 dark:border-gray-900">
          <div className="text-center mb-4 md:mb-8">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl dark:text-white">
              {t('features')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
              {t('featuresSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2">
            <Feature icon={<Calendar size="2rem" />} title={t('trackConcerts')}>
              {t('trackConcertsSubtitle')}
            </Feature>

            <Feature
              icon={<Users size="2rem" />}
              title={t('connectWithFriends')}
            >
              {t('connectWithFriendsSubtitle')}
            </Feature>
          </div>
        </Section>

        <Section className="dark:bg-gray-950 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-6xl/none dark:text-white">
              {t('readyToStart')}
            </h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              {t('readyToStartSubtitle')}
            </p>
            <Button asChild className="btn-teal text-lg p-6" size="lg">
              <Link to=".">
                {t('createAccount')}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </Section>
      </main>

      <footer className="text-center border-t py-6 bg-teal-50 dark:border-gray-900">
        <span>© {currentYear} Concertraker. All rights reserved.</span>
      </footer>
    </Suspense>
  );
}
