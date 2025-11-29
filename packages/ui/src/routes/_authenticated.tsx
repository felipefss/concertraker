import { UserButton } from '@clerk/clerk-react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { Header } from '@/components/Header';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    if (context.auth?.isLoaded && !context.auth.isSignedIn) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-teal-50 min-h-dvh">
      <Header>
        <nav>
          <UserButton
            appearance={{
              elements: {
                userButtonBox: 'border-2 rounded-sm p-2 border-black',
              },
            }}
            showName={true}
          />
        </nav>
      </Header>
      <Outlet />
    </div>
  );
}
