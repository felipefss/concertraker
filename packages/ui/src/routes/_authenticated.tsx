import { useAuth } from '@clerk/clerk-react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';

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
  const { signOut } = useAuth();

  const handleSignOut = () => {
    try {
      signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out', {
        closeButton: true,
        description: 'Please try again later',
        position: 'top-right',
        richColors: true,
      });
    }
  };

  return (
    <div className="bg-teal-50 min-h-dvh">
      <Header>
        <nav>
          <Button
            className="text-red-500 hover:text-red-700"
            onMouseDown={handleSignOut}
            variant="outline"
          >
            Sign Out
          </Button>
        </nav>
      </Header>
      <Outlet />
    </div>
  );
}
