import { AuthenticatedHeader } from '@/components/AuthenticatedHeader';
import { TRPCReactProvider } from '@/trpc/client';
import { getDictionary, type Locale } from '../dictionaries';
import { DictionaryProvider } from './contexts/dictionary-context';

export default async function AuthenticatedLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;

  const dict = await getDictionary(lang as Locale);

  return (
    <div className="bg-teal-50 min-h-dvh">
      <DictionaryProvider dictionary={dict}>
        <AuthenticatedHeader language={lang} />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </DictionaryProvider>
    </div>
  );
}
