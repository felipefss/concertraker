import 'react-native-gesture-handler';

import { ThemeProvider } from 'styled-components';
import { PaperProvider } from 'react-native-paper';

import { theme } from '@/styles/global';
import { Routes } from '@/routes';
import NavigationContainer from 'expo-router/src/fork/NavigationContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <PaperProvider>
            <Routes />
          </PaperProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
