import { Loader2Icon } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className='btn-teal' type='submit' disabled={pending}>
      {pending && <Loader2Icon className='animate-spin' />}
      Add
    </Button>
  );
}
