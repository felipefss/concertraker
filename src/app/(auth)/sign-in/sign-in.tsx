import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react';

import { theme } from '@/styles/global';
import styles, { containerStyles } from './styles';
import { useAuthContext } from '@/contexts/auth-context';

export default function SignIn() {
  const { session, signInWithEmail } = useAuthContext();

  useEffect(() => {
    if (session) {
      router.replace('/home');
    }
  }, [session]);

  const insets = useSafeAreaInsets();

  function handleGoToSignUpPage() {
    router.push('/sign-up');
  }

  function handleSignIn() {
    signInWithEmail('felipe@teste.com', '123456');
  }

  return (
    <View style={containerStyles({ insets }).container}>
      <Text style={styles.header}>ConcerTraker</Text>

      <View style={styles.signInForm}>
        <Text style={styles.signInText}>Sign In</Text>

        <TextInput label="Email" mode="outlined" activeOutlineColor={theme.colors.primary} />
        <TextInput label="Password" mode="outlined" secureTextEntry={true} activeOutlineColor={theme.colors.primary} />
        <Link style={styles.forgotPasswordLink} href="#">
          Forgot password?
        </Link>

        <TouchableOpacity onPress={handleSignIn}>
          <Button style={styles.signInButton} mode="contained">
            Sign In
          </Button>
        </TouchableOpacity>
      </View>

      <View style={styles.alternativeSignIn}>
        <Text>- OR -</Text>
        <Text>Sign in with</Text>

        <View style={styles.iconButtonsGroup}>
          <TouchableOpacity>
            <IconButton style={styles.iconButton} iconColor="white" icon="facebook" />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconButton style={styles.iconButton} iconColor="white" icon="twitter" />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconButton style={styles.iconButton} iconColor="white" icon="google" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={handleGoToSignUpPage}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
