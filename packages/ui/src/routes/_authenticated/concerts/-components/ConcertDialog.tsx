import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import type { ReactElement } from 'react';
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
import { queries } from '@/constants';
import { formatDate } from '@/helpers/date';
import { useApi } from '@/hooks/useApi';
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
  const isEditing = !!concert;
  const api = useApi();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // TODO: Put this in a mutations file in queryFns folder
    // TODO: Fix: remove the data from the request
    mutationFn: (data: { data: ConcertFormValues }) => {
      return api.post('/concerts', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queries.GET_CONCERTS] });
      onOpenChange(false);
    },
    // TODO: on error, show notification (sonner)
  });

  const methods = useForm<ConcertFormValues>({
    defaultValues: concert
      ? {
          artist: concert.artist,
          date: concert.date,
          location: concert.location,
          notes: concert.notes,
          venue: concert.venue,
        }
      : undefined,
    resolver: zodResolver(formSchema),
  });

  const { register, handleSubmit, reset } = methods;

  function onSubmit(data: ConcertFormValues) {
    if (isEditing) {
      console.log('edit', data);
      reset();
      return;
    }

    // TODO: Add option to use AI to insert a concert (maybe a chat bot with n8n? Or have an AI button to fill out the
    // fields that are empty)
    mutation.mutate({ data: { ...data, date: formatDate(data.date) } });
    onOpenChange(false);
    reset();
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{concert ? 'Edit' : 'Add a new'} concert</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <FormProvider {...methods}>
              <Input {...register('artist')} label="Artist" />
              <Input {...register('location')} label="Location" />
              <Input {...register('venue')} label="Venue" />
              <Input {...register('date')} label="Year" />
              <Input {...register('notes')} isMultiline={true} label="Notes" />
            </FormProvider>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="btn-teal-outline"
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="btn-teal"
              disabled={mutation.isPending}
              type="submit"
            >
              {mutation.isPending && <Loader2Icon className="animate-spin" />}
              {isEditing ? 'Save' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
