import { ReactNode } from 'react';
import { View } from 'react-native';
import { Menu } from 'react-native-paper';

import styles from './styles';
import { useAuthContext } from '@/contexts/auth-context';

interface Props {
  isVisible: boolean;
  anchor: ReactNode;
  onClose: () => void;
}

export function HeaderOptionsMenu({ isVisible, anchor, onClose }: Props) {
  const { signOut } = useAuthContext();

  function handleClickLogout() {
    signOut();
    onClose();
  }

  return (
    <View>
      <Menu visible={isVisible} anchor={anchor} onDismiss={onClose}>
        <Menu.Item leadingIcon="logout" title="Logout" onPress={handleClickLogout} titleStyle={styles.item} dense />
      </Menu>
    </View>
  );
}
