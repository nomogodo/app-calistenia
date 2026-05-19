import { ColorTokens, Palette } from '../types';

const dark = (
  accent: string,
  accentInk: string,
  bg = '#08090A', bg2 = '#0F1113',
  surf = '#15181B', surf2 = '#1B1E22'
): ColorTokens => ({
  bg, bg2, surface: surf, surface2: surf2,
  line: 'rgba(255,255,255,0.08)', line2: 'rgba(255,255,255,0.14)',
  fg: '#F5F5F2', fg2: 'rgba(245,245,242,0.72)',
  muted: 'rgba(245,245,242,0.50)', dim: 'rgba(245,245,242,0.32)',
  accent, accentInk, danger: '#FF6B6B', positive: '#4ADE80',
});

export const PALETTES: Record<Palette, ColorTokens> = {
  lime:    dark('#C8F046', '#0A1402'),
  inferno: dark('#F26A3F', '#1A0800', '#0A0807', '#12100E', '#1A1614', '#211C1A'),
  ice:     dark('#5AC8FA', '#001A2C', '#05080C', '#0B1018', '#111722', '#182030'),
  bone: {
    bg: '#F2EFE9', bg2: '#E8E4DE', surface: '#FFFFFF', surface2: '#F5F2EC',
    line: 'rgba(0,0,0,0.08)', line2: 'rgba(0,0,0,0.14)',
    fg: '#0F0E0C', fg2: 'rgba(15,14,12,0.72)',
    muted: 'rgba(15,14,12,0.50)', dim: 'rgba(15,14,12,0.32)',
    accent: '#0F0E0C', accentInk: '#F2EFE9', danger: '#CC3333', positive: '#2D7A4F',
  },
  volt:    dark('#D4FF00', '#0A1000', '#060708', '#0D0F10', '#131618', '#191D20'),
  blood:   dark('#DC143C', '#F5EEF0', '#080507', '#10090E', '#180D14', '#20111A'),
  royal:   dark('#7B68EE', '#F0EEF5', '#060508', '#0D0A10', '#140F18', '#1B1420'),
  mint:    dark('#00D2A0', '#001A14', '#050809', '#0A1012', '#0F181A', '#152022'),
  sunset:  dark('#FF8C42', '#1A0600', '#080706', '#100E0C', '#181510', '#201B14'),
  forest:  dark('#2D7A4F', '#EEF5F0', '#050808', '#0A1010', '#0F1815', '#14201A'),
  carbon:  dark('#9B9B9B', '#0A0A0A', '#0A0A0A', '#111111', '#191919', '#222222'),
  copper:  dark('#B87333', '#F5F0ED', '#080606', '#100D0B', '#181310', '#201916'),
};

export const PALETTE_LABELS: Record<Palette, string> = {
  lime: 'LIME', inferno: 'INFERNO', ice: 'ICE', bone: 'BONE',
  volt: 'VOLT', blood: 'BLOOD', royal: 'ROYAL', mint: 'MINT',
  sunset: 'SUNSET', forest: 'FOREST', carbon: 'CARBON', copper: 'COPPER',
};
