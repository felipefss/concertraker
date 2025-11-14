import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from '@tanstack/react-router';

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
  return (
    <div className="bg-teal-50 min-h-dvh">
      <Header>
        <nav>
          <Button className="text-red-500 hover:text-red-700" variant="outline">
            {/* <Link to="/sign-out">Sign out</Link> */}
            Sign Out
          </Button>
        </nav>
      </Header>
      <Outlet />
    </div>
  );
}
