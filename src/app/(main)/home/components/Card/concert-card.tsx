import dayjs from 'dayjs';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { Card, Modal, PaperProvider, Portal, Text } from 'react-native-paper';
import { SimpleLineIcons } from '@expo/vector-icons';

import styles from './styles';
import { OptionsMenu } from '../OptionsMenu';
import { theme } from '@/styles/global';
import { useRef, useState } from 'react';

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
  // const [anchorOptionsMenu, setAnchorOptionsMenu] = useState({ x: 0, y: 0 });
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const { artist, date, location, notes, venue } = data;

  function handleOpenMenu({ nativeEvent }: GestureResponderEvent) {
    setIsMenuVisible(true);
    console.log('OPEN');
  }

  function handleCloseMenu() {
    setIsMenuVisible(false);
    console.log('CLOSE');
  }

  return (
    <PaperProvider>
      <Card style={styles.container} contentStyle={styles.content}>
        {/* <SimpleLineIcons style={styles.optionsButton} name="options-vertical" size={14} color={theme.colors.text} /> */}

        <OptionsMenu
          anchor={
            <Pressable onPress={handleOpenMenu}>
              <SimpleLineIcons name="options-vertical" size={14} color={theme.colors.text} />
            </Pressable>
          }
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
    </PaperProvider>
  );
}
