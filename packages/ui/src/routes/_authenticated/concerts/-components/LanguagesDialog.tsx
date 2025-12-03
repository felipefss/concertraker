import { type ChangeEvent, useId, useState } from 'react';
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
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

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

  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const language = event.target.value;
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

          <FieldGroup onChange={handleLanguageChange}>
            <Field>
              <FieldLabel htmlFor={enId}>English</FieldLabel>
              <Input
                defaultChecked={selectedLanguage === 'en'}
                id={enId}
                name="language"
                type="radio"
                value="en"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor={ptBRId}>Português (Brasil)</FieldLabel>
              <Input
                defaultChecked={selectedLanguage === 'pt-BR'}
                id={ptBRId}
                name="language"
                type="radio"
                value="pt-BR"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor={esId}>Español</FieldLabel>
              <Input
                defaultChecked={selectedLanguage === 'es'}
                id={esId}
                name="language"
                type="radio"
                value="es"
              />
            </Field>
          </FieldGroup>

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
