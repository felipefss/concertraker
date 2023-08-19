import { ReactNode } from 'react';
import { View } from 'react-native';
import { Menu } from 'react-native-paper';

import styles from './styles';
import { router } from 'expo-router';
import { useConcertsContext } from '@/contexts/concerts-context';

interface Concert {
  id: string;
  artist: string;
  location: string;
  venue: string;
  year: string;
  notes: string | null;
}

interface Props {
  isVisible: boolean;
  anchor: ReactNode;
  onClose: () => void;
  concertData: Concert;
}

export function OptionsMenu({ isVisible, anchor, onClose, concertData }: Props) {
  const { deleteConcert } = useConcertsContext();

  function handleClickEdit() {
    router.push('/concert-form/edit');
    router.setParams({
      id: concertData.id,
    });
  }

  async function handleClickDelete() {
    await deleteConcert(concertData.id);
  }

  return (
    <View style={styles.container}>
      <Menu visible={isVisible} anchor={anchor} onDismiss={onClose} style={{ top: 10 }}>
        <Menu.Item leadingIcon="pencil-outline" title="Edit" onPress={handleClickEdit} titleStyle={styles.item} dense />
        <Menu.Item
          leadingIcon="trash-can-outline"
          title="Delete"
          onPress={handleClickDelete}
          titleStyle={styles.item}
          dense
        />
        {/* <Divider /> */}
        {/* <Menu.Item title="Setlist" /> */}
      </Menu>
    </View>
  );
}
