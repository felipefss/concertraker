import { ReactNode } from 'react';
import { View } from 'react-native';
import { Menu } from 'react-native-paper';

import styles from './styles';

interface Props {
  isVisible: boolean;
  anchor: ReactNode;
  onClose: () => void;
}

export function OptionsMenu({ isVisible, anchor, onClose }: Props) {
  return (
    <View style={styles.container}>
      <Menu visible={isVisible} anchor={anchor} onDismiss={onClose} style={{ top: 10 }}>
        <Menu.Item leadingIcon="pencil-outline" title="Edit" onPress={() => {}} titleStyle={styles.item} dense />
        <Menu.Item leadingIcon="trash-can-outline" title="Delete" onPress={() => {}} titleStyle={styles.item} dense />
        {/* <Divider /> */}
        {/* <Menu.Item title="Setlist" /> */}
      </Menu>
    </View>
  );
}
