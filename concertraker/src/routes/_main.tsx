import { createFileRoute, Outlet } from '@tanstack/react-router';

import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='bg-teal-50 min-h-dvh'>
      <Header>
        <nav>
          <Button className='text-red-500 hover:text-red-700' variant='outline'>
            Log Out
          </Button>
        </nav>
      </Header>
      <Outlet />
    </div>
  );
}
