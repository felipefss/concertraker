import { SignIn } from '@clerk/clerk-react';
import { shadcn } from '@clerk/themes';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_noAuth/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SignIn
      appearance={{
        theme: shadcn,
      }}
    />
  );
}
