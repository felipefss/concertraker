'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2Icon } from 'lucide-react';
import { type ReactElement, useActionState, useState } from 'react';
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
import { formatDate } from '@/helpers/date';
import { useDictionary } from '../../contexts/dictionary-context';
// import { useEditConcert } from '../-hooks/use-edit-concert';
// import { useInsertConcert } from '../-hooks/use-insert-concert';
import {
  type Concert,
  type ConcertFormValues,
  formSchema,
} from '../models/ConcertModel';
import { ArtistSuggestInput } from './ArtistSuggestInput';
import { Input } from './Input';

interface Props {
  children?: ReactElement;
  concert?: Concert;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// async function submitForm(previous) {}

export function ConcertDialog({
  children,
  concert,
  isOpen,
  onOpenChange,
}: Props) {
  const [dialogState, submitAction, isPending] = useActionState(
    async (
      previous: ConcertFormValues | undefined,
      actionPayload: { type: 'INSERT' | 'EDIT'; data: ConcertFormValues },
    ) => {
      console.log({ actionPayload });

      return actionPayload.data;
    },
    concert,
  );

  const {
    concertsList: { dialog: dialogDict },
  } = useDictionary();

  const isEditing = !!concert;

  // const insertMutation = useInsertConcert(onOpenChange);
  // const editMutation = useEditConcert(onOpenChange);

  const methods = useForm<ConcertFormValues>({
    defaultValues: dialogState,
    // defaultValues: concert
    //   ? {
    //       artist: concert.artist,
    //       date: formatDate(concert.date, 'shortYear'),
    //       location: concert.location,
    //       notes: concert.notes,
    //       venue: concert.venue,
    //     }
    //   : undefined,
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
  });

  const { register, handleSubmit, reset } = methods;

  function onSubmit(data: ConcertFormValues) {
    if (isEditing) {
      // editMutation.mutate({
      //   ...data,
      //   date: formatDate(new Date(data.date)),
      //   id: concert.id,
      // });
      console.log('editing');
      return;
    }

    // TODO: Add option to use AI to insert a concert (maybe a chat bot with n8n? Or have an AI button to fill out the
    // fields that are empty)
    // insertMutation.mutate({ ...data, date: formatDate(new Date(data.date)) });
    console.log('inserting');
    submitAction({ data, type: 'INSERT' });
    onOpenChange(false);
    reset();
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {concert ? dialogDict.titleEdit : dialogDict.titleInsert}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <FormProvider {...methods}>
              <ArtistSuggestInput
                {...register('artist')}
                label={dialogDict.artist}
              />
              <Input {...register('location')} label={dialogDict.location} />
              <Input {...register('venue')} label={dialogDict.venue} />
              <Input
                {...register('date')}
                label={dialogDict.date}
                placeholder="e.g. 2010-04"
                tooltipText={dialogDict.dateTooltip}
              />
              <Input
                {...register('notes')}
                isMultiline={true}
                label={dialogDict.notes}
              />
            </FormProvider>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="btn-teal-outline"
                type="button"
                variant="outline"
              >
                {dialogDict.cancelButton}
              </Button>
            </DialogClose>
            <Button className="btn-teal" disabled={isPending} type="submit">
              {isPending && <Loader2Icon className="animate-spin" />}
              {isEditing ? dialogDict.saveButton : dialogDict.addButton}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
