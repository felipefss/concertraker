'use client';

import { UserButton } from '@clerk/nextjs';
import { LanguagesIcon } from 'lucide-react';
import { useState } from 'react';
import { Header } from './Header';

export function AuthenticatedHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isScreenSmall = window.innerWidth < 640;

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <Header>
      <nav>
        <UserButton
          appearance={{
            elements: {
              userButtonBox: 'border-2 rounded-sm p-2 border-black',
            },
          }}
          showName={!isScreenSmall && true}
        >
          <UserButton.MenuItems>
            <UserButton.Action
              label="Switch Language"
              labelIcon={<LanguagesIcon size={20} />}
              onClick={handleOpenDialog}
            />
          </UserButton.MenuItems>
        </UserButton>
      </nav>
    </Header>
  );
}
