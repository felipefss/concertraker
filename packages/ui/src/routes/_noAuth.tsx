import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_noAuth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="bg-accent h-svh flex justify-center items-center">
      <Outlet />
    </main>
  );
}
