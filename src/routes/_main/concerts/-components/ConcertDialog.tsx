import { type ReactElement } from 'react';

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
  title: string;
  submitText: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConcertDialog({
  children,
  title,
  submitText,
  isOpen,
  onOpenChange,
}: Props) {
  function handleSubmit(formData: FormData) {
    console.log(formData);
    onOpenChange(false);
  }

  // TODO: use the shadcn's <Form> with Zod for localized error messages

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <Input name='artist' label='Artist' required />
            <Input name='location' label='Location' required />
            <Input name='venue' label='Venue' />
            <Input
              name='year'
              label='Year'
              required
              minLength={4}
              maxLength={4}
            />
            <Input name='notes' label='Notes' isMultiline={true} />
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
            <SubmitButton text={submitText} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
