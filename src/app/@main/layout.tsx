import { Header } from '@/components/Header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-teal-50 min-h-dvh'>
      <Header />
      {children}
    </div>
  );
}
