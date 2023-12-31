import { ReactNode } from 'react';
import { View, Alert } from 'react-native';
import { Menu } from 'react-native-paper';

import styles from './styles';
import { router } from 'expo-router';
import { useConcertsContext } from '@/contexts/concerts-context';

interface Concert {
  id: string;
  artist: string;
  location: string;
  venue: string;
  date: string;
  notes: string | null;
}

interface Props {
  isVisible: boolean;
  anchor: ReactNode;
  onClose: () => void;
  concertId: string;
}

export function CardOptionsMenu({ isVisible, anchor, onClose, concertId }: Props) {
  const { deleteConcert } = useConcertsContext();

  function handleClickEdit() {
    router.push('/edit-concert');
    router.setParams({
      id: concertId,
    });
    onClose();
  }

  async function handleClickDelete() {
    await deleteConcert(concertId);
  }

  function showConfirmDeleteDialog() {
    return Alert.alert('Are you sure?', 'Are you sure you want to delete this concert?', [
      {
        text: 'Yes',
        onPress: () => {
          handleClickDelete();
        },
      },
      { text: 'No' },
    ]);
  }

  return (
    <View style={styles.container}>
      <Menu visible={isVisible} anchor={anchor} onDismiss={onClose}>
        <Menu.Item leadingIcon="pencil-outline" title="Edit" onPress={handleClickEdit} titleStyle={styles.item} dense />
        <Menu.Item
          leadingIcon="trash-can-outline"
          title="Delete"
          onPress={showConfirmDeleteDialog}
          titleStyle={styles.item}
          dense
        />
        {/* <Divider /> */}
        {/* <Menu.Item title="Setlist" /> */}
      </Menu>
    </View>
  );
}
