import dayjs from 'dayjs';
import { View } from 'react-native';
import { Card as CardContainer, Text } from 'react-native-paper';

import styles from './styles';

interface CardData {
  artist: string;
  venue: string;
  location: string;
  date: Date;
  notes: string;
}

interface Props {
  data: CardData;
}

export function Card({ data }: Props) {
  const { artist, date, location, notes, venue } = data;

  return (
    <CardContainer style={styles.container} contentStyle={styles.content}>
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
    </CardContainer>
  );
}
