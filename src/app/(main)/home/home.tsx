import { FlatList, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

import { ConcertCard } from './components/Card';

import { theme } from '@/styles/global';
import styles from './styles';
import { HeaderRight } from './components/HeaderRight';
import { useConcertsContext } from '../contexts/concerts-context';

export default function Home() {
  const { concerts } = useConcertsContext();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'ConcerTraker',
          headerTitleStyle: { color: theme.colors.white },
          headerStyle: { backgroundColor: theme.colors.navBarBackground },
          headerRight: (props) => <HeaderRight />,
        }}
      />

      <FlatList data={concerts} renderItem={({ item }) => <ConcertCard key={item.id} data={item} />} />
    </SafeAreaView>
  );
}
