import dayjs from 'dayjs';
import { Pressable, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { SimpleLineIcons } from '@expo/vector-icons';

import styles from './styles';

interface CardData {
  artist: string;
  venue: string;
  location: string;
  date: string;
  notes: string;
}

interface Props {
  data: CardData;
}

export function ConcertCard({ data }: Props) {
  const { artist, date, location, notes, venue } = data;

  return (
    <Card style={styles.container} contentStyle={styles.content}>
      <Pressable style={{ position: 'relative' }}>
        <SimpleLineIcons style={styles.optionsButton} name="options-vertical" size={14} color="black" />
      </Pressable>
      <View style={styles.row}>
        <View style={styles.rightColumn}>
          <Text style={styles.label}>Artist</Text>
          <Text style={styles.value}>{artist}</Text>
        </View>

        <View style={styles.leftColumn}>
          <Text style={styles.label}>Venue</Text>
          <Text style={styles.value}>{venue}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.rightColumn}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{location}</Text>
        </View>

        <View style={styles.leftColumn}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{dayjs(date).format('MMM DD, YYYY')}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Notes</Text>
          <Text style={styles.value}>{notes}</Text>
        </View>
      </View>
    </Card>
  );
}
