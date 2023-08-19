import { Stack } from 'expo-router/stack';
import { ConcertsProvider } from '../../contexts/concerts-context';

export default function Layout() {
  return (
    <ConcertsProvider>
      <Stack screenOptions={{ animation: 'slide_from_right' }} />
    </ConcertsProvider>
  );
}
