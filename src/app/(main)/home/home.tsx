import { FlatList, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

import { ConcertCard } from './components/Card';

import { theme } from '@/styles/global';
import styles from './styles';
import { IconButton } from 'react-native-paper';
import { HeaderRight } from './components/HeaderRight';

const mockCardsData = [
  {
    id: 1,
    artist: 'John Smith and the Band',
    location: 'New York City, NY',
    venue: 'Central Park',
    date: '2023-08-15',
    notes: 'Outdoor event, bring your own blankets and chairs.',
  },
  {
    id: 2,
    artist: 'The Groovy Tunes',
    location: 'Los Angeles, CA',
    venue: 'The Roxy',
    date: '2023-09-02',
    notes: '21+ event, doors open at 8 PM.',
  },
  {
    id: 3,
    artist: 'Melody Makers',
    location: 'Chicago, IL',
    venue: 'Windy City Music Hall',
    date: '2023-10-10',
    notes: 'General admission tickets, all ages.',
  },
  {
    id: 4,
    artist: 'Melody Makers',
    location: 'Chicago, IL',
    venue: 'Windy City Music Hall',
    date: '2023-10-10',
    notes: 'General admission tickets, all ages.',
  },
  {
    id: 5,
    artist: 'Melody Makers',
    location: 'Chicago, IL',
    venue: 'Windy City Music Hall',
    date: '2023-10-10',
    notes: 'General admission tickets, all ages.',
  },
];

export default function Home() {
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

      <FlatList data={mockCardsData} renderItem={({ item }) => <ConcertCard key={item.id} data={item} />} />
    </SafeAreaView>
  );
}
