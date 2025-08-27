import { Loader2Icon } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

interface Props {
  text?: string;
}

export function SubmitButton({ text }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button className='btn-teal' type='submit' disabled={pending}>
      {pending && <Loader2Icon className='animate-spin' />}
      {text || 'Add'}
    </Button>
  );
}
