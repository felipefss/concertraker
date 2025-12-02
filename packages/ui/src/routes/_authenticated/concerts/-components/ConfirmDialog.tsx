import {
  type ConfirmDialogProps,
  confirmable,
  createConfirmation,
} from 'react-confirm';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('translation', {
    keyPrefix: 'restricted.concertsList.optionsMenu',
  });

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
            {t('cancelButton')}
          </Button>
          <Button onClick={() => proceed(true)}>{t('confirmButton')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const confirm = createConfirmation(confirmable(ConfirmDialog));
