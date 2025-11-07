import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import './index.css';
import type { useAuth } from '@clerk/clerk-react';

interface RouterContext {
  auth: ReturnType<typeof useAuth> | undefined;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
});

function Root() {
  return <Outlet />;
}
