import type { TextStyle } from 'react-native';

export const FONTS = {
  display: 'InterTight-ExtraBold',
  bold: 'InterTight-Bold',
  semiBold: 'InterTight-SemiBold',
  medium: 'InterTight-Medium',
  mono: 'JetBrainsMono-Medium',
  monoSemiBold: 'JetBrainsMono-SemiBold',
} as const;

export const TYPOGRAPHY: Record<string, TextStyle> = {
  display: {
    fontFamily: FONTS.display,
    letterSpacing: -1,
  },
  eyebrow: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  mono: {
    fontFamily: FONTS.mono,
  },
  body: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 22,
  },
  label: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
  },
};
