import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '@/app/(auth)/sign-in';
import Home from '@/app/(main)/home';

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
