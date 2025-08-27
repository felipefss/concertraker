import { Input as InputCn } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ComponentProps } from 'react';

type Props = {
  label: string;
  isMultiline?: boolean;
} & (ComponentProps<'input'> & ComponentProps<'textarea'>);

export const Input = ({ label, isMultiline, ...props }: Props) => {
  return (
    <div className='grid grid-cols-4 items-center gap-4'>
      <Label htmlFor='artist' className='justify-end font-bold'>
        {label}
      </Label>

      {isMultiline ? (
        <Textarea placeholder={label} className='col-span-3' {...props} />
      ) : (
        <InputCn
          id='artist'
          placeholder={label}
          className='col-span-3'
          {...props}
        />
      )}
    </div>
  );
};
