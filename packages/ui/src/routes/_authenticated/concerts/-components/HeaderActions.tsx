import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ConcertDialog } from './ConcertDialog';
import { SortDropdown } from './SortDropdown';

export function HeaderActions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex gap-2">
      {/* TODO: Implement filter functionality */}
      <SortDropdown />
      <ConcertDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Button className="btn-teal">
          <PlusIcon size={16} />
        </Button>
      </ConcertDialog>
    </div>
  );
}
