import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

import styles, { containerStyles } from './styles';
import { useAuthContext } from '@/contexts/auth-context';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HFTextInput } from '@/components/HFTextInput';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type FormModel = z.infer<typeof signInSchema>;

export default function SignIn() {
  const { signInWithEmail } = useAuthContext();
  const { control, handleSubmit } = useForm<FormModel>({
    resolver: zodResolver(signInSchema),
  });

  const insets = useSafeAreaInsets();

  function handleGoToSignUpPage() {
    router.push('/sign-up');
  }

  function handleSignIn({ email, password }: FormModel) {
    signInWithEmail(email, password);
  }

  return (
    <View style={containerStyles({ insets }).container}>
      <Text style={styles.header}>ConcerTraker</Text>

      <View style={styles.signInForm}>
        <Text style={styles.signInText}>Sign In</Text>

        <HFTextInput<FormModel> label="Email" name="email" control={control} />
        <HFTextInput<FormModel> label="Password" name="password" control={control} isPassword={true} />
        <Link style={styles.forgotPasswordLink} href="#">
          Forgot password?
        </Link>

        <TouchableOpacity onPress={handleSubmit(handleSignIn)}>
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
