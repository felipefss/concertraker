import { Stack } from 'expo-router';
import { SafeAreaView, View } from 'react-native';

import { theme } from '@/styles/global';

import styles from './styles';
import { ConcertForm } from '@/components/concert-form';

export default function NewConcert() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Add new concert',
          headerTitleStyle: { color: theme.colors.white },
          headerStyle: { backgroundColor: theme.colors.navBarBackground },
        }}
      />
      <View style={styles.content}>
        <ConcertForm />
      </View>
    </SafeAreaView>
  );
}
