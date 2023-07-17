import { ThemeProvider } from 'styled-components';

// import { StatusBar } from 'expo-status-bar';
import SignIn from '@/app/(auth)/sign-in';
import Home from '@/app/(main)/home';

import { theme } from '@/styles/global';

export default function App() {
  // return <Home />;
  return (
    <ThemeProvider theme={theme}>
      <SignIn />
    </ThemeProvider>
  );
}
