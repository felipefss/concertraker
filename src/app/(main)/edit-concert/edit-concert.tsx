import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, View } from 'react-native';
import { Banner, Text } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

import { HeaderLeft } from '@/components/HeaderLeft';
import { useConcertsContext } from '@/contexts/concerts-context';
import { ConcertForm } from '@/components/ConcertForm';
import { ConcertFormProvider } from '@/contexts/concert-form-context';

import { theme } from '@/styles/global';
import styles from './styles';

type SearchParams = {
  id: string;
};

export default function EditConcert() {
  const { onEditConcert } = useConcertsContext();
  const { id } = useLocalSearchParams<SearchParams>();

  if (!id) {
    return (
      <View>
        <Banner visible icon={({ size }) => <AntDesign name="warning" size={size} />}>
          <Text>Error! No concert ID provided!</Text>
        </Banner>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Edit concert',
          headerTitleStyle: { color: theme.colors.white },
          headerStyle: { backgroundColor: theme.colors.navBarBackground },
          headerBackVisible: false,
          headerLeft: (props) => <HeaderLeft {...props} />,
        }}
      />
      <ConcertFormProvider>
        <ConcertForm onSubmit={onEditConcert} id={id} />
      </ConcertFormProvider>
    </SafeAreaView>
  );
}
