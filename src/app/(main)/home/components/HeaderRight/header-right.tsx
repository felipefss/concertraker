import { TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';

export function HeaderRight() {
  return (
    <>
      <TouchableOpacity>
        <IconButton icon="plus" iconColor="white" />
      </TouchableOpacity>

      <TouchableOpacity>
        <IconButton icon="dots-vertical" iconColor="white" />
      </TouchableOpacity>
    </>
  );
}
