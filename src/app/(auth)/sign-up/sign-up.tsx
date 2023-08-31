import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

import { theme } from '@/styles/global';
import styles, { containerStyles } from './styles';
import { useAuthContext } from '@/contexts/auth-context';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HFTextInput } from '@/components/HFTextInput';

const signUpSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, 'Password should have at least 8 characters')
      .regex(/[A-z]|[0-9]|\W/, 'Password is weak'),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      });
    }
  });

type FormModel = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const { signUpWithEmail } = useAuthContext();
  const { control, handleSubmit } = useForm<FormModel>({
    resolver: zodResolver(signUpSchema),
  });

  const insets = useSafeAreaInsets();

  function handleGoToSignInPage() {
    router.back();
  }

  function handleSignUp({ email, name, password }: FormModel) {
    signUpWithEmail(email, password, name);
  }

  return (
    <View style={containerStyles({ insets }).container}>
      <Text style={styles.header}>ConcerTraker</Text>

      <View style={styles.signInForm}>
        <Text style={styles.signInText}>Sign Up</Text>

        <HFTextInput<FormModel> label="Name" name="name" control={control} />
        <HFTextInput<FormModel> label="Email" name="email" control={control} />
        <HFTextInput<FormModel> label="Password" name="password" control={control} isPassword={true} />
        <HFTextInput<FormModel> label="Confirm Password" name="confirmPassword" control={control} isPassword={true} />

        <TouchableOpacity onPress={handleSubmit(handleSignUp)}>
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
