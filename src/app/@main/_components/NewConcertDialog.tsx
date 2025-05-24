import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ReactElement } from 'react';
import { Input } from './Input';

interface Props {
  dialogTrigger?: ReactElement;
}

export const NewConcertDialog = ({ dialogTrigger }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='btn-teal-outline' variant='outline'>
          Add new
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add new concert</DialogTitle>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <Input label='Artist' />
          <Input label='Location' />
          <Input label='Venue' />
          <Input label='Year' />
          <Input label='Notes' isMultiline={true} />
        </div>
        <DialogFooter>
          <Button type='submit'>Insert</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
