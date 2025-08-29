import type { Concert } from '@/types/Concert';
import { type ReactElement } from 'react';
import { useForm } from 'react-hook-form';

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

import { Input } from './Input';
import { SubmitButton } from './SubmitButton';

interface Props {
  children?: ReactElement;
  concert?: Concert;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

type FormValues = Omit<Concert, 'id'>;

export function ConcertDialog({
  children,
  concert,
  isOpen,
  onOpenChange,
}: Props) {
  const { register, handleSubmit } = useForm<FormValues>({
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

  function onSubmit(data: FormValues) {
    console.log(data);
    onOpenChange(false);
  }

  // TODO: use the shadcn's <Form> with Zod for localized error messages

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{concert ? 'Edit' : 'Add a new'} concert</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-4 py-4'>
            <Input {...register('artist')} label='Artist' />
            <Input {...register('location')} label='Location' />
            <Input {...register('venue')} label='Venue' />
            <Input {...register('date')} label='Year' />
            <Input {...register('notes')} label='Notes' isMultiline={true} />
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
            <SubmitButton isEdit={!!concert} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
