import { Headphones } from 'lucide-react';
import type { ReactNode } from 'react';

export const Header = ({ children }: { children?: ReactNode }) => (
  <header className="border-b border-gray-200 dark:border-gray-800 px-4 lg:px-6 h-16 flex justify-between items-center bg-white dark:bg-gray-950">
    <span className="flex gap-2 font-bold text-xl">
      <Headphones className="h-6 w-6 text-teal-600 dark:text-teal-400" />
      <span className="dark:text-white">Concertraker</span>
    </span>

    <nav>{children}</nav>
  </header>
);
