import { Ellipsis } from 'lucide-react';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ConcertDialog } from './ConcertDialog';
import { confirm } from './ConfirmDialog';

interface Props {
  id: string;
}

export function ConcertOptions({ id }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function handleClickDelete() {
    const result = await confirm({
      message: 'Are you sure you want to delete this concert?',
    });

    if (result) {
      // await deleteConcert(id);
      console.log('DELETE CONCERT id', id);
    }
  }

  function handleClickEdit() {
    setIsDialogOpen(true);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className='absolute right-0 top-0'>
          <div className='border border-transparent rounded-md p-1 text-accent-foreground hover:border-border hover:bg-accent'>
            <Ellipsis className='h-5 w-5' />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleClickEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem onSelect={handleClickDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConcertDialog
        submitText='Save'
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
