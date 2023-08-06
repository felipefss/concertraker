import { Dimensions, StyleSheet } from 'react-native';
import { theme } from '@/styles/global';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  optionsButton: {
    position: 'absolute',
    right: -10,
    top: 0,
  },
  container: {
    backgroundColor: theme.colors.cardBackground,
    marginVertical: 10,
    width: width - 20,
    borderRadius: 4,
  },
  content: {
    position: 'relative',
    marginHorizontal: 15,
    marginVertical: 10,
    rowGap: 10,
  },
  rightColumn: {
    flex: 3,
  },
  leftColumn: {
    flex: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 13,
    color: theme.colors.secondaryText,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 13,
  },
});
