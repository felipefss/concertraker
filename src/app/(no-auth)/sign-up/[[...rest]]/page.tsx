import { SignUp } from '@clerk/nextjs';
import { shadcn } from '@clerk/themes';

export default async function AuthPage() {
  return (
    <SignUp
      appearance={{
        theme: shadcn,
      }}
    />
  );
}
