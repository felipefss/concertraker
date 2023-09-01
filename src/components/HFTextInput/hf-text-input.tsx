import { useConcertsContext } from '@/contexts/concerts-context';
import { theme } from '@/styles/global';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { Text, TextInput } from 'react-native-paper';

type Props<T> = {
  label: string;
  multiline?: boolean;
  isPassword?: boolean;
} & UseControllerProps<T & FieldValues>;

export function HFTextInput<T>({ control, name, label, multiline, isPassword }: Props<T>) {
  const {
    field,
    fieldState: { invalid, error },
    formState: { isSubmitting },
  } = useController({ control, name });

  return (
    <>
      <TextInput
        label={label}
        mode="outlined"
        activeOutlineColor={theme.colors.primary}
        multiline={multiline}
        numberOfLines={4}
        value={field.value}
        onChangeText={field.onChange}
        error={invalid}
        disabled={isSubmitting}
        secureTextEntry={isPassword}
      />
      {error?.message && (
        <Text variant="labelMedium" style={{ color: 'red' }}>
          {error.message}
        </Text>
      )}
    </>
  );
}
