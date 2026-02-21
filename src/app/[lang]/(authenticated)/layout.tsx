import { AuthenticatedHeader } from '@/components/AuthenticatedHeader';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-teal-50 min-h-dvh">
      <AuthenticatedHeader />
      {children}
    </div>
  );
}
