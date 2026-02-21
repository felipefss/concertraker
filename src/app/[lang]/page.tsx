import { ArrowRight, Calendar, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
// import { useTranslation } from 'react-i18next';
import { Feature } from '@/components/Feature';
import { Header } from '@/components/Header';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { getDictionary, hasLocale } from './dictionaries';

const concertHeroImg = '/concert-hero.jpg';

export default async function Home({ params }: PageProps<'/[lang]'>) {
  // const { t } = useTranslation('translation', {
  //   keyPrefix: 'no_auth.landing',
  // });
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }
  const dict = await getDictionary(lang);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Header>
        <nav className="flex gap-4">
          <Button asChild className="btn-teal">
            <Link href="/sign-in">{dict.landing.signInButton}</Link>
          </Button>

          <Button asChild className="btn-teal-outline" variant="outline">
            <Link href="/sign-up">{dict.landing.signUpButton}</Link>
          </Button>
        </nav>
      </Header>

      <main>
        <Section className="grid bg-gradient-to-b from-teal-50 to-white dark:from-teal-950/20 dark:to-gray-950 dark:bg-none gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col space-y-4 items-center lg:items-baseline">
            <h1 className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-6xl/none dark:text-white">
              {dict.landing.title}
            </h1>
            <p className="max-w-xl text-gray-500 md:text-xl dark:text-gray-400">
              {dict.landing.subtitle}
            </p>
            <div>
              <Button asChild className="btn-teal text-lg p-6" size="lg">
                <Link href=".">
                  {dict.landing.getStartedButton}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt={dict.landing.heroImgAlt}
              className="w-auto lg:w-full object-cover overflow-hidden rounded-lg shadow-xl"
              height={450}
              src={concertHeroImg}
              width={550}
            />
          </div>
        </Section>

        <Section className="bg-teal-50 dark:border-gray-900">
          <div className="text-center mb-4 md:mb-8">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl dark:text-white">
              {dict.landing.features}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
              {dict.landing.featuresSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2">
            <Feature
              icon={<Calendar size="2rem" />}
              title={dict.landing.trackConcerts}
            >
              {dict.landing.trackConcertsSubtitle}
            </Feature>

            <Feature
              icon={<Users size="2rem" />}
              title={dict.landing.connectWithFriends}
            >
              {dict.landing.connectWithFriendsSubtitle}
            </Feature>
          </div>
        </Section>

        <Section className="dark:bg-gray-950 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-6xl/none dark:text-white">
              {dict.landing.readyToStart}
            </h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              {dict.landing.readyToStartSubtitle}
            </p>
            <Button asChild className="btn-teal text-lg p-6" size="lg">
              <Link href="/sign-up">
                {dict.landing.createAccount}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </Section>
      </main>

      <footer className="text-center border-t py-6 bg-teal-50 dark:border-gray-900">
        <span>© {currentYear} Concertraker. All rights reserved.</span>
      </footer>
    </>
  );
}
