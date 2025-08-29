import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { type ReactElement } from 'react';
import { useFormStatus } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  type Concert,
  type ConcertFormValues,
  formSchema,
} from '../-models/ConcertModel';
import { Input } from './Input';

interface Props {
  children?: ReactElement;
  concert?: Concert;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConcertDialog({
  children,
  concert,
  isOpen,
  onOpenChange,
}: Props) {
  const { pending } = useFormStatus();

  const methods = useForm<ConcertFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: concert
      ? {
          artist: concert.artist,
          date: concert.date,
          location: concert.location,
          notes: concert.notes,
          venue: concert.venue,
        }
      : undefined,
  });

  const { register, handleSubmit } = methods;

  function onSubmit(data: ConcertFormValues) {
    if (concert) {
      console.log('edit', data);
      return;
    }

    console.log(data);
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{concert ? 'Edit' : 'Add a new'} concert</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-4 py-4'>
            <FormProvider {...methods}>
              <Input {...register('artist')} label='Artist' />
              <Input {...register('location')} label='Location' />
              <Input {...register('venue')} label='Venue' />
              <Input {...register('date')} label='Year' />
              <Input {...register('notes')} label='Notes' isMultiline={true} />
            </FormProvider>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className='btn-teal-outline'
                type='button'
                variant='outline'
              >
                Cancel
              </Button>
            </DialogClose>
            <Button className='btn-teal' type='submit' disabled={pending}>
              {pending && <Loader2Icon className='animate-spin' />}
              {concert ? 'Save' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
