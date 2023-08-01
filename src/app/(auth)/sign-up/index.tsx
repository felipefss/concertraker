import { Text, TextInput } from 'react-native-paper';
import * as Styled from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/styles/global';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function SignUp() {
  const insets = useSafeAreaInsets();

  function handleGoToSignInPage() {
    router.back();
  }

  return (
    <Styled.Container $insets={insets}>
      <Styled.Header>ConcerTraker</Styled.Header>

      <Styled.SignInForm>
        <Styled.SignInText>Sign Up</Styled.SignInText>

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
          <Styled.SignUpButton mode="contained">Sign Up</Styled.SignUpButton>
        </TouchableOpacity>
      </Styled.SignInForm>

      <Styled.AlternativeSignIn>
        <Text>- OR -</Text>
        <Text>Sign up with</Text>

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
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={handleGoToSignInPage}>
          <Styled.SignUpLink>Sign In</Styled.SignUpLink>
        </TouchableOpacity>
      </Styled.Footer>
    </Styled.Container>
  );
}
