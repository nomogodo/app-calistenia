import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const { width: SW } = Dimensions.get('window');

const EXERCISES = [
  { n: '01', t: 'Press banca', s: '4 × 6-8', w: '72,5 kg', newWeight: true },
  { n: '02', t: 'Press inclinado mancuernas', s: '4 × 8-10', w: '26 kg' },
  { n: '03', t: 'Aperturas en polea alta', s: '3 × 12', w: '12 kg' },
  { n: '04', t: 'Fondos en paralelas', s: '3 × AMRAP', w: 'BW' },
  { n: '05', t: 'Press francés con cuerda', s: '3 × 12', w: '20 kg' },
  { n: '06', t: 'Extensiones de tríceps polea', s: '3 × 12-15', w: '18 kg' },
  { n: '07', t: 'Elevaciones laterales', s: '4 × 12', w: '8 kg' },
  { n: '08', t: 'Cardio · cinta', s: '10 min', w: 'Zona 2', finisher: true },
];

const STATS = [
  { l: 'EJER', v: '8' },
  { l: 'SERIES', v: '27' },
  { l: 'TIEMPO', v: "52'" },
  { l: 'KCAL', v: '420' },
];

export function RoutinePreviewScreen({ navigation }: any) {
  const colors = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Hero banner */}
      <View style={{ height: 220, backgroundColor: colors.surface2, justifyContent: 'flex-end' }}>
        <Svg width={SW} height={220} style={{ position: 'absolute', top: 0, left: 0 }} opacity={0.18}>
          <G stroke={colors.line} strokeWidth={1}>
            {Array.from({ length: 20 }).map((_, i) => (
              <Path key={`h${i}`} d={`M0 ${i * 12} H${SW}`} />
            ))}
            {Array.from({ length: 30 }).map((_, i) => (
              <Path key={`v${i}`} d={`M${i * 16} 0 V220`} />
            ))}
          </G>
        </Svg>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute', top: 12, left: 16,
            width: 38, height: 38, borderRadius: 99,
            backgroundColor: 'rgba(0,0,0,0.5)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ color: colors.fg, fontSize: 16 }}>←</Text>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 24, paddingBottom: 14 }}>
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.accent }]}>● DÍA 5 · PUSH</Text>
          <Text style={[TYPOGRAPHY.display, { fontSize: 30, marginTop: 4, color: colors.fg }]}>Pecho y tríceps</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        {/* Stats row */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, flexDirection: 'row', gap: 6 }}>
          {STATS.map((s, i) => (
            <View key={i} style={{ flex: 1, padding: 10, borderRadius: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, alignItems: 'center' }}>
              <Text style={[TYPOGRAPHY.eyebrow, { fontSize: 9, color: colors.muted }]}>{s.l}</Text>
              <Text style={[TYPOGRAPHY.display, { fontSize: 20, marginTop: 4, color: colors.fg }]}>{s.v}</Text>
            </View>
          ))}
        </View>

        {/* Exercise list */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, gap: 6 }}>
          {EXERCISES.map((ex) => (
            <TouchableOpacity
              key={ex.n}
              onPress={() => navigation.navigate('ExerciseDetail', { exerciseId: ex.n })}
              style={{
                flexDirection: 'row', alignItems: 'center', padding: 10, gap: 12,
                borderRadius: 12, backgroundColor: colors.surface,
                borderWidth: 1, borderColor: colors.line,
              }}
            >
              <View style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: colors.surface2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18 }}>💪</Text>
              </View>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.dim }]}>{ex.n}</Text>
              <View style={{ flex: 1, minWidth: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: colors.fg }} numberOfLines={1}>{ex.t}</Text>
                  {ex.newWeight && (
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4, backgroundColor: colors.accent }}>
                      <Text style={[TYPOGRAPHY.mono, { fontSize: 8, color: colors.accentInk, fontWeight: '700', letterSpacing: 1 }]}>+ PESO</Text>
                    </View>
                  )}
                  {ex.finisher && (
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4, backgroundColor: colors.surface2 }}>
                      <Text style={[TYPOGRAPHY.mono, { fontSize: 8, color: colors.muted, letterSpacing: 1 }]}>FINISHER</Text>
                    </View>
                  )}
                </View>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted, marginTop: 3 }]}>
                  {ex.s} · {ex.w}
                </Text>
              </View>
              <Text style={{ color: colors.dim, fontSize: 14 }}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Start CTA */}
      <View
        style={{
          position: 'absolute', bottom: 34, left: 0, right: 0,
          paddingHorizontal: SPACING.md, paddingVertical: 14,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('ActiveWorkout')}
          style={{
            height: 60, borderRadius: 14, backgroundColor: colors.accent,
            flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}
        >
          <Text style={{ color: colors.accentInk, fontSize: 18 }}>▶</Text>
          <Text style={{ fontSize: 15, fontWeight: '700', color: colors.accentInk, letterSpacing: 1 }}>
            COMENZAR ENTRENAMIENTO
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
