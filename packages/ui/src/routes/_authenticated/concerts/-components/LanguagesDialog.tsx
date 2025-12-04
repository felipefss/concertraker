import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function LanguagesDialog({ isOpen, onOpenChange }: Props) {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const enId = useId();
  const ptBRId = useId();
  const esId = useId();

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleApplyChange = () => {
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select a language</DialogTitle>
            <DialogDescription>
              Select a language to use in the application.
            </DialogDescription>
          </DialogHeader>

          <RadioGroup
            className="justify-center"
            defaultValue={selectedLanguage}
            onValueChange={handleLanguageChange}
          >
            <div className="flex gap-2">
              <RadioGroupItem id={enId} value="en" />
              <Label htmlFor={enId}>English</Label>
            </div>

            <div className="flex gap-2">
              <RadioGroupItem id={ptBRId} value="pt-BR" />
              <Label htmlFor={ptBRId}>Português (Brasil)</Label>
            </div>

            <div className="flex gap-2">
              <RadioGroupItem id={esId} value="es" />
              <Label htmlFor={esId}>Español</Label>
            </div>
          </RadioGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleApplyChange}>Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
