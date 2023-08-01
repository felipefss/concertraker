import { theme } from '@/styles/global';
import { Slot } from 'expo-router';
import { ThemeProvider } from 'styled-components/native';

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <Slot />
    </ThemeProvider>
  );
}
