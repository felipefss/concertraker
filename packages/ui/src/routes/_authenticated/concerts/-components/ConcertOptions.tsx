import { Ellipsis } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteConcert } from '../-hooks/use-delete-concert';
import type { Concert } from '../-models/ConcertModel';
import { ConcertDialog } from './ConcertDialog';
import { confirm } from './ConfirmDialog';

interface Props {
  concert: Concert;
  onDelete: (isDeleting: boolean) => void;
}

export function ConcertOptions({ concert, onDelete }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'restricted.concertsList.optionsMenu',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutate: deleteMutation, isPending: isDeleting } = useDeleteConcert();

  useEffect(() => {
    onDelete(isDeleting);
  }, [onDelete, isDeleting]);

  async function handleClickDelete() {
    const result = await confirm({
      message: t('confirmDeleteMessage'),
    });

    if (result) {
      deleteMutation(concert.id);
      onDelete(isDeleting);
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
            {t('editButton')}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleClickDelete}>
            {t('deleteButton')}
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
