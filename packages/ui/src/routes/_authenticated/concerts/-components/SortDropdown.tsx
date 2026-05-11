import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  ArrowDownWideNarrowIcon,
  ArrowDownZAIcon,
  ArrowUpAZIcon,
  ArrowUpNarrowWideIcon,
  Check,
  ListFilterIcon,
} from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Route } from '..';

export function SortDropdown() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { sortBy, order } = useSearch({ from: Route.id });

  const selectedOption = `${sortBy}-${order}`;

  const { t } = useTranslation('translation', {
    keyPrefix: 'restricted.concertsList',
  });

  const itemsList = useMemo(
    () => [
      {
        icon: <ArrowUpAZIcon />,
        id: 'artist-asc',
        label: t('sortOptions.artistAsc'),
      },
      {
        icon: <ArrowDownZAIcon />,
        id: 'artist-desc',
        label: t('sortOptions.artistDesc'),
      },
      {
        icon: <ArrowUpNarrowWideIcon />,
        id: 'date-asc',
        label: t('sortOptions.dateAsc'),
      },
      {
        icon: <ArrowDownWideNarrowIcon />,
        id: 'date-desc',
        label: t('sortOptions.dateDesc'),
      },
    ],
    [t],
  );

  const handleSortChange = (optionId: string) => {
    const [newSortBy, newOrder] = optionId.split('-');

    navigate({
      search: (prev) => ({
        ...prev,
        order: newOrder as 'asc' | 'desc',
        sortBy: newSortBy as 'artist' | 'date',
      }),
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="btn-teal-outline"
          tooltip={t('sortBy')}
          variant="outline"
        >
          <ListFilterIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {itemsList.map((item) => (
          <DropdownMenuItem
            disabled={selectedOption === item.id}
            key={item.id}
            onSelect={() => handleSortChange(item.id)}
          >
            {item.icon}
            {item.label} {selectedOption === item.id && <Check />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
