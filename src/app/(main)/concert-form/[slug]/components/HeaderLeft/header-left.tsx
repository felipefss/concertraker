import { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';

export function HeaderLeft({ canGoBack }: HeaderButtonProps) {
  function handleGoBack() {
    if (canGoBack) router.back();
  }

  return (
    <TouchableOpacity onPress={handleGoBack} style={{ marginLeft: -15, marginRight: 20 }}>
      <IconButton icon="arrow-left" iconColor="white" />
    </TouchableOpacity>
  );
}
