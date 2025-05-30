import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ConcertOptions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='absolute right-0 top-0'>
        <div className='border border-transparent rounded-md p-1 text-accent-foreground hover:border-border hover:bg-accent'>
          <Ellipsis className='h-5 w-5' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
