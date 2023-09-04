import dayjs from 'dayjs';
import { Pressable, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { SimpleLineIcons } from '@expo/vector-icons';

import styles from './styles';
import { CardOptionsMenu } from '../CardOptionsMenu';
import { theme } from '@/styles/global';
import { useState } from 'react';

interface CardData {
  id: string;
  artist: string;
  venue: string;
  location: string;
  date: string;
  notes: string | null;
}

interface Props {
  data: CardData;
}

export function ConcertCard({ data }: Props) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const { artist, date, location, notes, venue, id } = data;

  function handleOpenMenu() {
    setIsMenuVisible(true);
  }

  function handleCloseMenu() {
    setIsMenuVisible(false);
  }

  return (
    <Card style={styles.container} contentStyle={styles.content}>
      <CardOptionsMenu
        anchor={
          <Pressable onPress={handleOpenMenu}>
            <SimpleLineIcons name="options-vertical" size={14} color={theme.colors.text} />
          </Pressable>
        }
        concertId={id}
        isVisible={isMenuVisible}
        onClose={handleCloseMenu}
      />

      <View style={styles.row}>
        <View style={styles.leftColumn}>
          <Text style={styles.label}>Artist</Text>
          <Text style={styles.value}>{artist}</Text>
        </View>

        <View style={styles.rightColumn}>
          <Text style={styles.label}>Venue</Text>
          <Text style={styles.value}>{venue}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.leftColumn}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{location}</Text>
        </View>

        <View style={styles.rightColumn}>
          <Text style={styles.label}>Year</Text>
          <Text style={styles.value}>{dayjs(date).format('YYYY')}</Text>
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
