import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import type { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
import { useEditConcert } from '../-hooks/use-edit-concert';
import { useInsertConcert } from '../-hooks/use-insert-concert';
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
  const { t } = useTranslation('translation', {
    keyPrefix: 'restricted.concertsList.dialog',
  });

  const isEditing = !!concert;

  const insertMutation = useInsertConcert(onOpenChange);
  const editMutation = useEditConcert(onOpenChange);

  const methods = useForm<ConcertFormValues>({
    defaultValues: concert
      ? {
          artist: concert.artist,
          date: formatDate(concert.date, 'shortYear'),
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
      editMutation.mutate({
        ...data,
        date: formatDate(new Date(data.date)),
        id: concert.id,
      });
      return;
    }

    // TODO: Add option to use AI to insert a concert (maybe a chat bot with n8n? Or have an AI button to fill out the
    // fields that are empty)
    insertMutation.mutate({ ...data, date: formatDate(new Date(data.date)) });
    onOpenChange(false);
    reset();
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {concert ? t('titleEdit') : t('titleInsert')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <FormProvider {...methods}>
              <Input {...register('artist')} label={t('artist')} />
              <Input {...register('location')} label={t('location')} />
              <Input {...register('venue')} label={t('venue')} />
              <Input
                {...register('date')}
                label={t('date')}
                placeholder="e.g. 2010-04"
                tooltipText={t('dateTooltip')}
              />
              <Input
                {...register('notes')}
                isMultiline={true}
                label={t('notes')}
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
                {t('cancelButton')}
              </Button>
            </DialogClose>
            <Button
              className="btn-teal"
              disabled={insertMutation.isPending}
              type="submit"
            >
              {insertMutation.isPending && (
                <Loader2Icon className="animate-spin" />
              )}
              {isEditing ? t('saveButton') : t('addButton')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
