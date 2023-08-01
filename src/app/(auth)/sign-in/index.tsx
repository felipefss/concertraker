import { Text, TextInput } from 'react-native-paper';
import * as Styled from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/styles/global';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function SignIn() {
  const insets = useSafeAreaInsets();

  function handleGoToSignUpPage() {
    router.push('/sign-up');
  }

  return (
    <Styled.Container $insets={insets}>
      <Styled.Header>ConcerTraker</Styled.Header>

      <Styled.SignInForm>
        <Styled.SignInText>Sign In</Styled.SignInText>

        <TextInput label="Email" mode="outlined" activeOutlineColor={theme.colors.primary} />
        <TextInput label="Password" mode="outlined" secureTextEntry={true} activeOutlineColor={theme.colors.primary} />
        <Styled.ForgotPasswordLink href="#">Forgot password?</Styled.ForgotPasswordLink>

        <TouchableOpacity>
          <Styled.SignInButton mode="contained">Sign In</Styled.SignInButton>
        </TouchableOpacity>
      </Styled.SignInForm>

      <Styled.AlternativeSignIn>
        <Text>- OR -</Text>
        <Text>Sign in with</Text>

        <Styled.IconButtonsGroup>
          <TouchableOpacity>
            <Styled.IconButton iconColor="white" icon="facebook" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Styled.IconButton iconColor="white" icon="twitter" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Styled.IconButton iconColor="white" icon="google" />
          </TouchableOpacity>
        </Styled.IconButtonsGroup>
      </Styled.AlternativeSignIn>

      <Styled.Footer>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={handleGoToSignUpPage}>
          <Styled.SignUpLink>Sign Up</Styled.SignUpLink>
        </TouchableOpacity>
      </Styled.Footer>
    </Styled.Container>
  );
}
