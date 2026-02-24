'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useId, useState } from 'react';
import { setLanguageCookie } from '@/app/[lang]/(authenticated)/actions/set-language-cookie';
import { useDictionary } from '@/app/[lang]/(authenticated)/contexts/dictionary-context';
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
  language: string;
}

export function LanguagesDialog({ isOpen, onOpenChange, language }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const pathname = usePathname();
  const router = useRouter();
  const dict = useDictionary();

  const enId = useId();
  const ptBRId = useId();
  const esId = useId();

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleApplyChange = async () => {
    await setLanguageCookie(selectedLanguage);

    if (!pathname) {
      return;
    }

    const pathSegments = pathname.split('/');
    pathSegments[1] = selectedLanguage;
    const newPath = pathSegments.join('/');

    router.push(newPath);
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dict.languagesDialog.title}</DialogTitle>
            <DialogDescription>
              {dict.languagesDialog.description}
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
              <Button>{dict.languagesDialog.cancelButton}</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleApplyChange}>
                {dict.languagesDialog.saveButton}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
