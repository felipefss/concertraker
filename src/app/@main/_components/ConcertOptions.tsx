'use client';

import { Ellipsis } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { deleteConcert } from '../actions';
import { confirm } from './ConfirmDialog';

interface Props {
  id: string;
}

export function ConcertOptions({ id }: Props) {
  async function handleClickDelete() {
    const result = await confirm({
      message: 'Are you sure you want to delete this concert?',
    });

    if (result) {
      await deleteConcert(id);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='absolute right-0 top-0'>
        <div className='border border-transparent rounded-md p-1 text-accent-foreground hover:border-border hover:bg-accent'>
          <Ellipsis className='h-5 w-5' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleClickDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
