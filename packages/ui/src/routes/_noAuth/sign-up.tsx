import { SignUp } from '@clerk/clerk-react';
import { shadcn } from '@clerk/themes';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_noAuth/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SignUp
      appearance={{
        theme: shadcn,
      }}
    />
  );
}
