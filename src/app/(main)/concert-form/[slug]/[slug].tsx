import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native-paper';
import { zodResolver } from '@hookform/resolvers/zod';

import { theme } from '@/styles/global';

import { HeaderLeft } from './components/HeaderLeft';
import { HFTextInput } from './components/HFTextInput';
import styles from './styles';
import { z } from 'zod';

const headerTitles = {
  add: 'Add new concert',
  edit: 'Edit concert',
};

type SearchParams = {
  slug: 'add' | 'edit';
};

const schema = z.object({
  artist: z.string(),
  location: z.string(),
  venue: z.string(),
  date: z.date(),
  notes: z.string().optional(),
});

type FormModel = z.infer<typeof schema>;

export default function ConcertForm() {
  const { slug } = useLocalSearchParams<SearchParams>();

  const { control, handleSubmit } = useForm<FormModel>({
    resolver: zodResolver(schema),
  });

  if (!slug) {
    return;
  }

  const title = headerTitles[slug];

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
        <HFTextInput<FormModel> name="date" label="Date" control={control} />
        <HFTextInput<FormModel> name="notes" label="Notes" multiline={true} control={control} />

        <TouchableOpacity style={styles.submitButton}>
          <Button mode="contained" buttonColor={theme.colors.accent} textColor={theme.colors.text}>
            Submit
          </Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
