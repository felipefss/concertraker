'use client';

import { Ellipsis } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDictionary } from '../../contexts/dictionary-context';
import type { Concert } from '../models/ConcertModel';
import { ConcertDialog } from './ConcertDialog';
import { confirm } from './ConfirmDialog';

interface Props {
  concert: Concert;
  onDelete: (isDeleting: boolean) => void;
}

export function ConcertOptions({ concert, onDelete }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    concertsList: { optionsMenu: optionsMenuDict },
  } = useDictionary();
  // const { mutate: deleteMutation, isPending: isDeleting } = useDeleteConcert();

  // useEffect(() => {
  //   onDelete(isDeleting);
  // }, [onDelete, isDeleting]);

  async function handleClickDelete() {
    const result = await confirm({
      message: optionsMenuDict.confirmDeleteMessage,
    });

    if (result) {
      // deleteMutation(concert.id);
      // onDelete(isDeleting);
      console.log('deleting', concert.id);
    }
  }

  function handleClickEdit() {
    setIsDialogOpen(true);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute right-0 top-0">
          <div className="border border-transparent rounded-md p-1 text-accent-foreground hover:border-border hover:bg-accent">
            <Ellipsis className="h-5 w-5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleClickEdit}>
            {optionsMenuDict.editButton}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleClickDelete}>
            {optionsMenuDict.deleteButton}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConcertDialog
        concert={concert}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
