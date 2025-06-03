import { ReactElement, ReactNode } from 'react';

interface Props {
  icon: ReactElement;
  title: string;
  children: ReactNode;
}

export function Feature({ children, icon, title }: Props) {
  return (
    <div className='flex flex-col items-center'>
      <div className='bg-teal-100 dark:bg-teal-900/50 rounded-full h-16 w-16 text-teal-600 dark:text-teal-400 flex justify-center items-center mb-4'>
        {icon}
      </div>
      <h3 className='text-xl font-bold dark:text-white mb-2'>{title}</h3>
      <p className='text-gray-500 dark:text-gray-400'>{children}</p>
    </div>
  );
}
