import { Input as InputCn } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  label: string;
  isMultiline?: boolean;
}

export const Input = ({ label, isMultiline }: Props) => {
  return (
    <div className='grid grid-cols-4 items-center gap-4'>
      <Label htmlFor='artist' className='justify-end font-bold'>
        {label}
      </Label>

      {isMultiline ? (
        <Textarea placeholder={label} className='w-full' />
      ) : (
        <InputCn id='artist' placeholder={label} className='col-span-3' />
      )}
    </div>
  );
};
