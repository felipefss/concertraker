import { Header } from '@/components/Header';
import { HeaderNav } from './_components/HeaderNav';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-teal-50 min-h-dvh'>
      <Header>
        <HeaderNav />
      </Header>
      {children}
    </div>
  );
}
