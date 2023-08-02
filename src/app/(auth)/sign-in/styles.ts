import { theme } from '@/styles/global';
import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

interface ContainerProps {
  insets: EdgeInsets;
}

export const containerStyles = ({ insets }: ContainerProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,

      backgroundColor: theme.colors.background,
    },
  });

export default StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  signInForm: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 0,
    gap: 8,
  },
  signInText: {
    alignSelf: 'center',
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    color: theme.colors.primary,
  },
  signInButton: {
    marginTop: 30,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  alternativeSignIn: {
    alignItems: 'center',
  },
  iconButtonsGroup: {
    flexDirection: 'row',
    marginTop: 10,
  },
  iconButton: {
    backgroundColor: theme.colors.secondary,
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  signUpLink: {
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
});
