import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Svg, { Circle, G, Line, Path } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const MEASUREMENTS = [
  { l: 'Pecho', v: '102', d: '+2,0', cm: true },
  { l: 'Cintura', v: '78', d: '-1,5', cm: true, waist: true },
  { l: 'Cadera', v: '96', d: '+0,5', cm: true },
  { l: 'Brazo', v: '38', d: '+1,2', cm: true },
  { l: 'Pierna', v: '60', d: '+1,8', cm: true },
];

const OTHERS = [
  { l: '% Grasa', v: '14,2', u: '%' },
  { l: 'Peso', v: '78,4', u: 'kg' },
  { l: 'Pulso reposo', v: '58', u: 'bpm' },
  { l: 'Tensión', v: '118/76', u: '' },
];

const MEASUREMENT_POINTS = [
  { y: 90, label: 'chest' },
  { y: 130, label: 'waist' },
  { y: 160, label: 'hips' },
  { y: 220, label: 'thigh' },
  { y: 65, label: 'arm' },
];

export function BiometricsScreen({ navigation }: any) {
  const colors = useTheme();
  const [values, setValues] = useState(MEASUREMENTS.map((m) => m.v));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Header */}
      <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.sm, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 36, height: 36, borderRadius: 99,
            backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ color: colors.fg }}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>MEDIDAS · 19 MAY</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2, color: colors.fg }}>Perímetros</Text>
        </View>
        <TouchableOpacity
          style={{
            paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99,
            backgroundColor: colors.accent,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '700', color: colors.accentInk }}>GUARDAR</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, flexDirection: 'row', gap: 16 }}>
          {/* Body silhouette */}
          <View style={{ width: 110 }}>
            <Svg viewBox="0 0 110 280" width={110} height={280}>
              <G stroke="rgba(255,255,255,0.25)" strokeWidth={1.2} fill="rgba(255,255,255,0.04)">
                <Circle cx={55} cy={28} r={18} />
                <Path d="M30 48 Q55 44 80 48 L85 100 L25 100 Z" />
                <Path d="M25 105 Q55 108 85 105 L82 145 L28 145 Z" />
                <Path d="M30 105 L10 105 L4 200" />
                <Path d="M80 105 L100 105 L106 200" />
                <Path d="M38 150 L32 230 L38 270 L50 270 L52 200 L48 150" />
                <Path d="M72 150 L78 230 L72 270 L60 270 L58 200 L62 150" />
              </G>
              {MEASUREMENT_POINTS.map((p, i) => (
                <G key={i}>
                  <Line x1={2} y1={p.y} x2={108} y2={p.y} stroke={colors.accent} strokeWidth={1} strokeDasharray="2 3" opacity={0.7} />
                  <Circle cx={55} cy={p.y} r={3} fill={colors.accent} />
                </G>
              ))}
            </Svg>
          </View>

          {/* Measurement inputs */}
          <View style={{ flex: 1, gap: 8 }}>
            {MEASUREMENTS.map((m, i) => {
              const isGood = m.waist ? m.d.startsWith('-') : !m.d.startsWith('-');
              return (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row', alignItems: 'center', gap: 10,
                    padding: 8, borderRadius: 10,
                    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
                  }}
                >
                  <Text style={{ fontSize: 11, color: colors.fg2, width: 50 }}>{m.l}</Text>
                  <TextInput
                    value={values[i]}
                    onChangeText={(t) => setValues((prev) => prev.map((v, j) => j === i ? t : v))}
                    style={[
                      TYPOGRAPHY.mono,
                      { flex: 1, fontSize: 15, fontWeight: '700', color: colors.fg, textAlign: 'right' },
                    ]}
                    keyboardType="numeric"
                  />
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted }]}>cm</Text>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4, backgroundColor: colors.surface2 }}>
                    <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: isGood ? colors.accent : '#FF8080' }]}>{m.d}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Other metrics */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>OTROS</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {OTHERS.map((m, i) => (
              <View
                key={i}
                style={{
                  width: '48%', padding: 12, borderRadius: 12,
                  backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
                }}
              >
                <Text style={[TYPOGRAPHY.eyebrow, { fontSize: 9, color: colors.muted }]}>{m.l}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3, marginTop: 4 }}>
                  <Text style={[TYPOGRAPHY.display, { fontSize: 22, color: colors.fg }]}>{m.v}</Text>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted }]}>{m.u}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
