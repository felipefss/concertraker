import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { FormModel, concertSchema } from '@/components/ConcertForm/schema';

interface Props {
  children: ReactNode;
}

export function ConcertFormProvider({ children }: Props) {
  const methods = useForm<FormModel>({
    resolver: zodResolver(concertSchema),
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
}
