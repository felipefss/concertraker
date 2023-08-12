import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';

export function HeaderRight() {
  function handlePressAddButton() {
    router.push('/concert-form/add');
  }

  return (
    <>
      <TouchableOpacity onPress={handlePressAddButton}>
        <IconButton icon="plus" iconColor="white" />
      </TouchableOpacity>

      <TouchableOpacity>
        <IconButton icon="menu" iconColor="white" />
      </TouchableOpacity>
    </>
  );
}
