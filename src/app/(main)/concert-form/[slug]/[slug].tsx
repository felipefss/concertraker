import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';

import { theme } from '@/styles/global';

import styles from './styles';
import { Button, TextInput } from 'react-native-paper';

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

  const title = headerTitles[slug];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title,
          headerTitleStyle: { color: theme.colors.white },
          headerStyle: { backgroundColor: theme.colors.navBarBackground },
        }}
      />
      <View style={styles.content}>
        <TextInput label="Artist" mode="outlined" activeOutlineColor={theme.colors.primary} />
        <TextInput label="Location" mode="outlined" activeOutlineColor={theme.colors.primary} />
        <TextInput label="Venue" mode="outlined" activeOutlineColor={theme.colors.primary} />
        <TextInput label="Date" mode="outlined" activeOutlineColor={theme.colors.primary} />
        <TextInput
          label="Notes"
          mode="outlined"
          activeOutlineColor={theme.colors.primary}
          multiline={true}
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.submitButton}>
          <Button mode="contained" buttonColor={theme.colors.accent} textColor={theme.colors.text}>
            Submit
          </Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
