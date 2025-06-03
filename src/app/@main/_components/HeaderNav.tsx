import { Button } from '@/components/ui/button';

export function HeaderNav() {
  return (
    <nav>
      <Button className='text-red-500 hover:text-red-700' variant='outline'>
        Log Out
      </Button>
    </nav>
  );
}
