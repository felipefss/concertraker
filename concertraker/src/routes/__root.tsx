import { createRootRoute, Outlet } from '@tanstack/react-router';

import './index.css';

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return <Outlet />;
}
