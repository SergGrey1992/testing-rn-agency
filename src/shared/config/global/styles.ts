import {StyleSheet} from 'react-native';
import { COLORS } from '../colors';

export const global = StyleSheet.create({
  full: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: undefined,
    color: COLORS.dark,
  },
});
