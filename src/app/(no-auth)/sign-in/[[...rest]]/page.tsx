import { SignIn } from '@clerk/nextjs';
import { shadcn } from '@clerk/themes';

export default async function AuthPage() {
  return (
    <SignIn
      appearance={{
        theme: shadcn,
      }}
    />
  );
}
