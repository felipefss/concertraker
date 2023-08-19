import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, createContext, useContext } from 'react';
import { Control, FormProvider, useForm } from 'react-hook-form';

import { FormModel, concertSchema } from '@/components/ConcertForm/schema';

// interface ContextProps {
//   control: Control<FormModel>;
// }

// const ConcertFormContext = createContext({} as ContextProps);

interface Props {
  children: ReactNode;
}

export function ConcertFormProvider({ children }: Props) {
  const methods = useForm<FormModel>({
    resolver: zodResolver(concertSchema),
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
}

// export function useConcertFormContext() {
//   const context = useContext(ConcertFormContext);

//   if (!context) {
//     throw new Error('No ConcertFormContext provided!');
//   }

//   return context;
// }
