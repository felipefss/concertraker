import { theme } from '@/styles/global';
import { TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import styles from './styles';

export function ConcertForm() {
  return (
    <>
      <TextInput label="Artist" mode="outlined" activeOutlineColor={theme.colors.primary} />
      <TextInput label="Location" mode="outlined" activeOutlineColor={theme.colors.primary} />
      <TextInput label="Venue" mode="outlined" activeOutlineColor={theme.colors.primary} />
      <TextInput label="Date" mode="outlined" activeOutlineColor={theme.colors.primary} />
      <TextInput
        label="Notes"
        mode="outlined"
        activeOutlineColor={theme.colors.primary}
        multiline={true}
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.submitButton}>
        <Button mode="contained" buttonColor={theme.colors.accent} textColor={theme.colors.text}>
          Submit
        </Button>
      </TouchableOpacity>
    </>
  );
}
