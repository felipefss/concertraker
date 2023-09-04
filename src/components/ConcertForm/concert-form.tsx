import { TouchableOpacity, View } from 'react-native';
import { HFTextInput } from '../HFTextInput';
import { ActivityIndicator, Button } from 'react-native-paper';
import { theme } from '@/styles/global';

import styles from './styles';
import { FormModel } from './schema';
import { useFormContext } from 'react-hook-form';
import { useConcertsContext } from '@/contexts/concerts-context';
import { useEffect } from 'react';
import dayjs from 'dayjs';

interface Props {
  onSubmit: (data: FormModel) => Promise<void>;
  id?: string;
}

export function ConcertForm({ onSubmit, id }: Props) {
  const { concerts } = useConcertsContext();
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
  } = useFormContext<FormModel>();

  useEffect(() => {
    if (id) {
      const currentConcert = concerts.find((concert) => concert.id === id);

      if (currentConcert) {
        setValue('id', currentConcert.id);
        setValue('artist', currentConcert.artist);
        setValue('location', currentConcert.location);
        setValue('venue', currentConcert.venue);
        setValue('date', dayjs(currentConcert.date).format('YYYY'));
        setValue('notes', currentConcert.notes);
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <HFTextInput<FormModel> name="artist" label="Artist" control={control} />
      <HFTextInput<FormModel> name="location" label="Location" control={control} />
      <HFTextInput<FormModel> name="venue" label="Venue" control={control} />
      <HFTextInput<FormModel> name="date" label="Year" control={control} />
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
