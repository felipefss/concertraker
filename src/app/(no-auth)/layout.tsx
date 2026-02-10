export default function NoAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-accent h-svh flex justify-center items-center">
      {children}
    </main>
  );
}
