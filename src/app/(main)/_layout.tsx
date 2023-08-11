import { Stack } from 'expo-router/stack';
import { ConcertsProvider } from './contexts/concerts-context';

export default function Layout() {
  return (
    <ConcertsProvider>
      <Stack />
    </ConcertsProvider>
  );
}
