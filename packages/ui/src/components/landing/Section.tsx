import { clsx } from 'clsx/lite';
import type { ComponentProps, ReactNode } from 'react';

interface Props extends ComponentProps<'section'> {
  children: ReactNode;
}

export function Section({ children, className, ...props }: Props) {
  return (
    <section
      className={clsx('w-full py-12 md:py-24 px-4 md:px-6', className)}
      {...props}
    >
      {children}
    </section>
  );
}
