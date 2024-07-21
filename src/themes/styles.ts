import {fonts} from './fonts';
import {StyleSheet} from 'react-native';

export const fontStyles = StyleSheet.create({
  textSmall: {
    fontSize: fonts.typography.fontSize.small,
    fontWeight: fonts.typography.fontWeight.regular,
  },
  textRegular: {
    fontSize: fonts.typography.fontSize.regular,
    fontWeight: fonts.typography.fontWeight.regular,
  },
  textMediumRegular: {
    fontSize: fonts.typography.fontSize.medium,
    fontWeight: fonts.typography.fontWeight.regular,
  },
  textMediumBold: {
    fontSize: fonts.typography.fontSize.medium,
    fontWeight: fonts.typography.fontWeight.bold,
  },
  textLargeBold: {
    fontSize: fonts.typography.fontSize.large,
    fontWeight: fonts.typography.fontWeight.bold,
  },
});
