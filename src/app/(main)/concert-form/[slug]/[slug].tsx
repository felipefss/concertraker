import { Stack, router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Button } from 'react-native-paper';
import { zodResolver } from '@hookform/resolvers/zod';

import { HeaderLeft } from '../../../../components/HeaderLeft';
import { HFTextInput } from '../../../../components/HFTextInput';
import { FormModel, concertSchema } from '../../../../components/ConcertForm/schema';

import { theme } from '@/styles/global';
import styles from './styles';
import { useConcertsContext } from '../../../../contexts/concerts-context';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const headerTitles = {
  add: 'Add new concert',
  edit: 'Edit concert',
};

type SearchParams = {
  slug: 'add' | 'edit';
  id?: string;
};

export default function ConcertForm() {
  const { slug, id } = useLocalSearchParams<SearchParams>();

  if (!slug) {
    return;
  }

  const { onSubmitForm, concerts } = useConcertsContext();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
    setValue,
  } = useForm<FormModel>({
    resolver: zodResolver(concertSchema),
  });

  const title = headerTitles[slug];

  useEffect(() => {
    if (isSubmitted) {
      router.back();
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (id) {
      const currentConcert = concerts.find((concert) => concert.id === id);

      if (currentConcert) {
        setValue('artist', currentConcert.artist);
        setValue('location', currentConcert.location);
        setValue('venue', currentConcert.venue);
        setValue('year', dayjs(currentConcert.year).format('YYYY'));
        setValue('notes', currentConcert.notes);
      }
    }
  }, []);

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
    </SafeAreaView>
  );
}
