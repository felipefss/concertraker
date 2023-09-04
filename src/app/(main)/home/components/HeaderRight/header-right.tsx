import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { HeaderOptionsMenu } from '../HeaderOptionsMenu';
import { useState } from 'react';

export function HeaderRight() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  function handlePressAddButton() {
    router.push('/add-concert');
  }

  function handleOpenMenu() {
    setIsMenuVisible(true);
  }

  function handleCloseMenu() {
    setIsMenuVisible(false);
  }

  return (
    <>
      <TouchableOpacity onPress={handlePressAddButton}>
        <IconButton icon="plus" iconColor="white" />
      </TouchableOpacity>

      <HeaderOptionsMenu
        isVisible={isMenuVisible}
        onClose={handleCloseMenu}
        anchor={
          <TouchableOpacity onPress={handleOpenMenu}>
            <IconButton icon="menu" iconColor="white" />
          </TouchableOpacity>
        }
      />
    </>
  );
}
