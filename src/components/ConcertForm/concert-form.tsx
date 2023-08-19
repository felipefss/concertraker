import { TouchableOpacity, View } from 'react-native';
import { HFTextInput } from '../HFTextInput';
import { ActivityIndicator, Button } from 'react-native-paper';
import { theme } from '@/styles/global';

import styles from './styles';
import { FormModel } from './schema';
import { useFormContext } from 'react-hook-form';

interface Props {
  onSubmit: (data: FormModel) => Promise<void>;
}

export function ConcertForm({ onSubmit }: Props) {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useFormContext<FormModel>();

  return (
    <View style={styles.container}>
      <HFTextInput<FormModel> name="artist" label="Artist" control={control} />
      <HFTextInput<FormModel> name="location" label="Location" control={control} />
      <HFTextInput<FormModel> name="venue" label="Venue" control={control} />
      <HFTextInput<FormModel> name="year" label="Year" control={control} />
      <HFTextInput<FormModel> name="notes" label="Notes" multiline={true} control={control} />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        {isSubmitting ? (
          <ActivityIndicator size="large" color={theme.colors.text} />
        ) : (
          <Button mode="contained" buttonColor={theme.colors.accent} textColor={theme.colors.text}>
            Submit
          </Button>
        )}
      </TouchableOpacity>
    </View>
  );
}
