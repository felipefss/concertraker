import type { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';

import { Input as InputCn } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  label: string;
  isMultiline?: boolean;
} & (ComponentProps<'input'> & ComponentProps<'textarea'>);

export const Input = ({ label, isMultiline, ...props }: Props) => {
  const {
    formState: { errors },
  } = useFormContext();

  console.log(props.name, errors[props.name!]?.message);
  const errorMessage = errors[props.name!]?.message;

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

      {errorMessage && (
        <span className='text-red-500 text-xs italic col-span-3 col-start-2 my-[-4rem]'>
          {errorMessage as string}
        </span>
      )}
    </div>
  );
};
