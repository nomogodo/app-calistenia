import React from 'react';
import Svg, { Circle, Polygon, Text as SvgText, Defs, RadialGradient, Stop } from 'react-native-svg';

const RANKS = [
  { id: 'recluta', t: 'Recluta', c: '#7B8794' },
  { id: 'bronce', t: 'Bronce', c: '#B87333' },
  { id: 'plata', t: 'Plata', c: '#C0C5CC' },
  { id: 'oro', t: 'Oro', c: '#E8B339' },
  { id: 'platino', t: 'Platino', c: '#7FE5DC' },
  { id: 'diamante', t: 'Diamante', c: '#7AB8FF' },
  { id: 'maestro', t: 'Maestro', c: '#C49BFF' },
  { id: 'elite', t: 'Élite', c: '#FF6B6B' },
] as const;

interface Props {
  tier: string;
  size?: number;
}

export function RankInsignia({ tier, size = 80 }: Props) {
  const rank = RANKS.find((r) => r.id === tier) ?? RANKS[0];
  const gradId = `rg-${tier}`;

  return (
    <Svg viewBox="0 0 100 100" width={size} height={size}>
      <Defs>
        <RadialGradient id={gradId} cx="50%" cy="35%">
          <Stop offset="0%" stopColor={rank.c} stopOpacity={0.4} />
          <Stop offset="100%" stopColor={rank.c} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Circle cx={50} cy={50} r={48} fill={`url(#${gradId})`} />
      <Polygon
        points="50,12 86,38 78,86 50,72 22,86 14,38"
        fill="none"
        stroke={rank.c}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <Polygon
        points="50,22 76,42 71,74 50,64 29,74 24,42"
        fill={rank.c}
        fillOpacity={0.15}
        stroke={rank.c}
        strokeWidth={1.2}
      />
      <SvgText
        x={50}
        y={56}
        textAnchor="middle"
        fontSize={22}
        fontWeight="900"
        fill={rank.c}
        letterSpacing={-1}
      >
        {rank.t.slice(0, 1)}
      </SvgText>
    </Svg>
  );
}

export { RANKS };
