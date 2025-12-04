import { UserButton } from '@clerk/clerk-react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { LanguagesIcon } from 'lucide-react';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { LanguagesDialog } from './_authenticated/concerts/-components/LanguagesDialog';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isScreenSmall = window.innerWidth < 640;

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

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
            showName={!isScreenSmall && true}
          >
            <UserButton.MenuItems>
              <UserButton.Action
                label="Switch Language"
                labelIcon={<LanguagesIcon size={20} />}
                onClick={handleOpenDialog}
              />
            </UserButton.MenuItems>
          </UserButton>
        </nav>
      </Header>
      <Outlet />
      <LanguagesDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
