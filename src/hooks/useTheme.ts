import { useAppStore } from '../store/useAppStore';
import { PALETTES, ColorTokens } from '../constants/colors';

export function useTheme(): ColorTokens {
  const palette = useAppStore((s) => s.palette);
  return PALETTES[palette];
}
