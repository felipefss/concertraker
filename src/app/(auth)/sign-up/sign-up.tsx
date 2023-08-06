import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

import { theme } from '@/styles/global';
import styles, { containerStyles } from './styles';

export default function SignUp() {
  const insets = useSafeAreaInsets();

  function handleGoToSignInPage() {
    router.back();
  }

  return (
    <View style={containerStyles({ insets }).container}>
      <Text style={styles.header}>ConcerTraker</Text>

      <View style={styles.signInForm}>
        <Text style={styles.signInText}>Sign Up</Text>

        <TextInput label="Name" mode="outlined" activeOutlineColor={theme.colors.primary} />
        <TextInput label="Email" mode="outlined" activeOutlineColor={theme.colors.primary} />
        <TextInput label="Password" mode="outlined" secureTextEntry={true} activeOutlineColor={theme.colors.primary} />
        <TextInput
          label="Confirm Password"
          mode="outlined"
          secureTextEntry={true}
          activeOutlineColor={theme.colors.primary}
        />

        <TouchableOpacity>
          <Button style={styles.signInButton} mode="contained">
            Sign Up
          </Button>
        </TouchableOpacity>
      </View>

      <View style={styles.alternativeSignIn}>
        <Text>- OR -</Text>
        <Text>Sign up with</Text>

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
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={handleGoToSignInPage}>
          <Text style={styles.signUpLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
