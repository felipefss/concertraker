import { Stack, router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Button } from 'react-native-paper';
import { zodResolver } from '@hookform/resolvers/zod';

import { HeaderLeft } from './components/HeaderLeft';
import { HFTextInput } from './components/HFTextInput';
import { FormModel, concertSchema } from './schema';

import { theme } from '@/styles/global';
import styles from './styles';
import { useConcertsContext } from '../../contexts/concerts-context';
import { useEffect } from 'react';

const headerTitles = {
  add: 'Add new concert',
  edit: 'Edit concert',
};

type SearchParams = {
  slug: 'add' | 'edit';
};

export default function ConcertForm() {
  const { slug } = useLocalSearchParams<SearchParams>();

  if (!slug) {
    return;
  }

  const { onSubmitForm } = useConcertsContext();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = useForm<FormModel>({
    resolver: zodResolver(concertSchema),
  });

  const title = headerTitles[slug];

  useEffect(() => {
    if (isSubmitted) {
      router.back();
    }
  }, [isSubmitted]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title,
          headerTitleStyle: { color: theme.colors.white },
          headerStyle: { backgroundColor: theme.colors.navBarBackground },
          headerBackVisible: false,
          headerLeft: (props) => <HeaderLeft {...props} />,
        }}
      />
      <View style={styles.content}>
        <HFTextInput<FormModel> name="artist" label="Artist" control={control} />
        <HFTextInput<FormModel> name="location" label="Location" control={control} />
        <HFTextInput<FormModel> name="venue" label="Venue" control={control} />
        <HFTextInput<FormModel> name="year" label="Year" control={control} />
        <HFTextInput<FormModel> name="notes" label="Notes" multiline={true} control={control} />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit((data) => onSubmitForm(data, slug))}>
          {isSubmitting ? (
            <ActivityIndicator size="large" color={theme.colors.text} />
          ) : (
            <Button mode="contained" buttonColor={theme.colors.accent} textColor={theme.colors.text}>
              Submit
            </Button>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
