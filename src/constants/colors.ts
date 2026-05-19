import { Palette } from '../types';

export interface ColorTokens {
  bg: string;
  bg2: string;
  surface: string;
  surface2: string;
  line: string;
  line2: string;
  fg: string;
  fg2: string;
  muted: string;
  dim: string;
  accent: string;
  accentInk: string;
  danger: string;
  positive: string;
}

export const PALETTES: Record<Palette, ColorTokens> = {
  lime: {
    bg: '#08090A',
    bg2: '#0F1113',
    surface: '#15181B',
    surface2: '#1B1E22',
    line: 'rgba(255,255,255,0.08)',
    line2: 'rgba(255,255,255,0.14)',
    fg: '#F5F5F2',
    fg2: 'rgba(245,245,242,0.72)',
    muted: 'rgba(245,245,242,0.50)',
    dim: 'rgba(245,245,242,0.32)',
    accent: '#C8F046',
    accentInk: '#0A1402',
    danger: '#FF6B6B',
    positive: '#4ADE80',
  },
  inferno: {
    bg: '#0A0807',
    bg2: '#120E0B',
    surface: '#1A1614',
    surface2: '#221C18',
    line: 'rgba(255,255,255,0.08)',
    line2: 'rgba(255,255,255,0.14)',
    fg: '#F5F3F0',
    fg2: 'rgba(245,243,240,0.72)',
    muted: 'rgba(245,243,240,0.50)',
    dim: 'rgba(245,243,240,0.32)',
    accent: '#F26A3F',
    accentInk: '#1A0800',
    danger: '#FF4040',
    positive: '#4ADE80',
  },
  ice: {
    bg: '#05080C',
    bg2: '#090E16',
    surface: '#111722',
    surface2: '#182030',
    line: 'rgba(255,255,255,0.08)',
    line2: 'rgba(255,255,255,0.14)',
    fg: '#F0F4FA',
    fg2: 'rgba(240,244,250,0.72)',
    muted: 'rgba(240,244,250,0.50)',
    dim: 'rgba(240,244,250,0.32)',
    accent: '#5AC8FA',
    accentInk: '#001820',
    danger: '#FF6B6B',
    positive: '#4ADE80',
  },
  bone: {
    bg: '#F2EFE9',
    bg2: '#E8E5DF',
    surface: '#FFFFFF',
    surface2: '#F5F2EC',
    line: 'rgba(0,0,0,0.08)',
    line2: 'rgba(0,0,0,0.14)',
    fg: '#0F0E0C',
    fg2: 'rgba(15,14,12,0.72)',
    muted: 'rgba(15,14,12,0.50)',
    dim: 'rgba(15,14,12,0.32)',
    accent: '#0F0E0C',
    accentInk: '#F2EFE9',
    danger: '#CC3333',
    positive: '#2A8A3E',
  },
};
