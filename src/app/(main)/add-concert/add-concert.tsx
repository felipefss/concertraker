import { theme } from '@/styles/global';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';

import styles from './styles';
import { HeaderLeft } from '@/components/HeaderLeft';
import { useConcertsContext } from '@/contexts/concerts-context';
import { ConcertForm } from '@/components/ConcertForm';
import { ConcertFormProvider } from '@/contexts/concert-form-context';

export default function AddConcert() {
  const { onAddConcert } = useConcertsContext();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Add new concert',
          headerTitleStyle: { color: theme.colors.white },
          headerStyle: { backgroundColor: theme.colors.navBarBackground },
          headerBackVisible: false,
          headerLeft: (props) => <HeaderLeft {...props} />,
        }}
      />
      <ConcertFormProvider>
        <ConcertForm onSubmit={onAddConcert} />
      </ConcertFormProvider>
    </SafeAreaView>
  );
}
