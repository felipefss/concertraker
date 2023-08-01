import { Link } from 'expo-router';
import { Text, IconButton as RNIconButton, Button } from 'react-native-paper';
import { EdgeInsets } from 'react-native-safe-area-context';
import { styled } from 'styled-components/native';

interface ContainerProps {
  $insets: EdgeInsets;
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ $insets }) => $insets.top}px;
  padding-bottom: ${({ $insets }) => $insets.bottom}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled(Text)`
  font-size: 26px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const SignInForm = styled.View`
  width: 100%;
  padding: 0 15px;
  gap: 8px;
`;

export const SignInText = styled(Text)`
  align-self: center;
  margin-bottom: 20px;

  font-size: 20px;
  font-weight: bold;
`;

export const SignUpButton = styled(Button)`
  margin-top: 30px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
`;

export const AlternativeSignIn = styled.View`
  align-items: center;
`;

export const IconButtonsGroup = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const IconButton = styled(RNIconButton)`
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Footer = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
`;

export const SignUpLink = styled(Text)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
`;
