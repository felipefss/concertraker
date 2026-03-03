'use client ';

import {
  type ConfirmDialogProps,
  ContextAwareConfirmation,
  confirmable,
} from 'react-confirm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDictionary } from '../../contexts/dictionary-context';

function ConfirmDialog({
  show,
  proceed,
  message,
}: ConfirmDialogProps<{ message: string }, boolean>) {
  const {
    concertsList: { optionsMenu },
  } = useDictionary();

  return (
    <Dialog open={show}>
      <DialogContent className="[&>#dialogXbutton]:hidden">
        <DialogHeader>
          <DialogTitle>{message}</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <Button
            className="btn-teal-outline"
            onClick={() => proceed(false)}
            type="button"
            variant="outline"
          >
            {optionsMenu.cancelButton}
          </Button>
          <Button onClick={() => proceed(true)}>
            {optionsMenu.confirmButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const confirm = ContextAwareConfirmation.createConfirmation(
  confirmable(ConfirmDialog),
);
