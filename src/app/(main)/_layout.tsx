import { Stack } from 'expo-router/stack';
import { ConcertsProvider } from '../../contexts/concerts-context';
import { PaperProvider } from 'react-native-paper';

export default function Layout() {
  return (
    <ConcertsProvider>
      <PaperProvider>
        <Stack screenOptions={{ animation: 'slide_from_right' }} />
      </PaperProvider>
    </ConcertsProvider>
  );
}
