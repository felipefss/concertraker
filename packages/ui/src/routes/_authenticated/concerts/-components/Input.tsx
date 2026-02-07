import { CircleQuestionMark } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input as InputCn } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
  label: string;
  isMultiline?: boolean;
  tooltipText?: string;
} & (ComponentProps<'input'> & ComponentProps<'textarea'>);

export const Input = ({
  label,
  isMultiline,
  placeholder,
  tooltipText,
  ...props
}: Props) => {
  const {
    formState: { errors },
  } = useFormContext();

  // biome-ignore lint/style/noNonNullAssertion: <Props name should never be null>
  const errorMessage = errors[props.name!]?.message;

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label className="justify-end font-bold" htmlFor="artist">
        {label}{' '}
        {tooltipText && (
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleQuestionMark size={14} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </Label>

      {isMultiline ? (
        <Textarea className="col-span-3" placeholder={label} {...props} />
      ) : (
        <InputCn
          className="col-span-3"
          id={props.name}
          placeholder={placeholder || label}
          {...props}
        />
      )}

      {errorMessage && (
        <span className="text-red-500 text-xs italic col-span-3 col-start-2 my-[-4rem]">
          {errorMessage as string}
        </span>
      )}
    </div>
  );
};
