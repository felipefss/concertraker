import { theme } from '@/styles/global';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
    zIndex: 1000,
  },
  item: {
    fontSize: 14,
  },
});
