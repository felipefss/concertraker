import { DialogDescription } from '@radix-ui/react-dialog';

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

import { addNewConcertAction } from '../actions';
import { Input } from './Input';

export function NewConcertDialog() {
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
          <DialogDescription>
            Fill the form to add a new concert to the list
          </DialogDescription>
        </DialogHeader>

        <form action={addNewConcertAction}>
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
            <DialogClose asChild>
              <Button className='btn-teal' type='submit'>
                Add
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
