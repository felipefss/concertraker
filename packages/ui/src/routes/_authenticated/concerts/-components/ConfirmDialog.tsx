import {
  type ConfirmDialogProps,
  confirmable,
  createConfirmation,
} from 'react-confirm';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

function ConfirmDialog({
  show,
  proceed,
  message,
}: ConfirmDialogProps<{ message: string }, boolean>) {
  return (
    <Dialog open={show}>
      <DialogContent>
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
            Cancel
          </Button>
          <Button onClick={() => proceed(true)}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const confirm = createConfirmation(confirmable(ConfirmDialog));
