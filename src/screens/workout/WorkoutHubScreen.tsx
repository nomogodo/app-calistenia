import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/useAppStore';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const WEEK = [
  { d: 'L', t: 'Push', s: 'Pecho · Tríceps', done: true },
  { d: 'M', t: 'Pull', s: 'Espalda · Bíceps', done: true },
  { d: 'X', t: 'Pierna', s: 'Cuádriceps · Glúteo', done: true },
  { d: 'J', t: 'Descanso', s: 'Recuperación activa', rest: true },
  { d: 'V', t: 'Push', s: 'Pecho · Tríceps', today: true },
  { d: 'S', t: 'Pull', s: 'Espalda · Bíceps', done: false },
  { d: 'D', t: 'Pierna', s: 'Cuádriceps · Glúteo', done: false },
] as const;

const VOLUMES = [
  { m: 'Pecho', v: 22, max: 24 },
  { m: 'Espalda', v: 24, max: 24 },
  { m: 'Pierna', v: 20, max: 22 },
  { m: 'Hombro', v: 14, max: 18 },
  { m: 'Brazo', v: 18, max: 20 },
];

export function WorkoutHubScreen({ navigation }: any) {
  const colors = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.sm }}>
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>PLAN ACTIVO · PPL 6 DÍAS</Text>
          <Text style={[TYPOGRAPHY.display, { fontSize: 30, marginTop: 6, color: colors.fg }]}>
            {'Semana 4\nde 12.'}
          </Text>
        </View>

        {/* Week strip */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, gap: 8, flexDirection: 'row' }}
          style={{ marginTop: 4 }}
        >
          {WEEK.map((day, i) => (
            <View
              key={i}
              style={{
                width: 78, padding: 12, borderRadius: 14,
                backgroundColor: (day as any).today ? `${colors.accent}22` : colors.surface,
                borderWidth: 1,
                borderColor: (day as any).today ? colors.accent : colors.line,
                opacity: (day as any).rest ? 0.55 : 1,
                alignItems: 'center',
              }}
            >
              <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted, letterSpacing: 1.5 }]}>{day.d}</Text>
              <Text style={{ fontSize: 13, fontWeight: '700', marginTop: 6, color: colors.fg }}>{day.t}</Text>
              {(day as any).done && (
                <Text style={{ color: colors.accent, marginTop: 4, fontSize: 12 }}>✓</Text>
              )}
              {(day as any).today && (
                <Text style={[TYPOGRAPHY.mono, { fontSize: 8, color: colors.accent, marginTop: 4, fontWeight: '700', letterSpacing: 1 }]}>
                  HOY
                </Text>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Volume by muscle */}
        <View style={{ marginTop: SPACING.lg, paddingHorizontal: SPACING.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>VOLUMEN SEMANAL</Text>
            <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.accent }]}>+8% vs sem 3</Text>
          </View>
          <View style={{ padding: 16, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }}>
            {VOLUMES.map((b, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6, gap: 12 }}>
                <Text style={{ width: 64, fontSize: 12, color: colors.fg2 }}>{b.m}</Text>
                <View style={{ flex: 1, height: 6, backgroundColor: colors.surface2, borderRadius: 99, overflow: 'hidden' }}>
                  <View style={{ width: `${(b.v / b.max) * 100}%` as any, height: '100%', backgroundColor: colors.accent }} />
                </View>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted, width: 64, textAlign: 'right' }]}>
                  {b.v} / {b.max}s
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Monthly stats */}
        <View style={{ marginTop: SPACING.md, paddingHorizontal: SPACING.md, flexDirection: 'row', gap: 8 }}>
          {[
            { l: 'Sesiones', v: '14' },
            { l: 'Volumen', v: '18.2t' },
            { l: 'PRs', v: '4' },
          ].map((s, i) => (
            <View key={i} style={{ flex: 1, padding: 14, borderRadius: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }}>
              <Text style={[TYPOGRAPHY.eyebrow, { fontSize: 9, color: colors.muted }]}>{s.l}</Text>
              <Text style={[TYPOGRAPHY.display, { fontSize: 26, marginTop: 4, color: colors.fg }]}>{s.v}</Text>
            </View>
          ))}
        </View>

        {/* AI suggestion */}
        <View
          style={{
            marginTop: SPACING.md, marginHorizontal: SPACING.md, padding: 14,
            borderRadius: 14, backgroundColor: `${colors.accent}14`,
            borderWidth: 1, borderColor: colors.accent,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={{ color: colors.accent, fontSize: 14 }}>✦</Text>
            <Text style={[TYPOGRAPHY.eyebrow, { color: colors.accent }]}>SUGERENCIA DEL COACH</Text>
          </View>
          <Text style={{ fontSize: 13, lineHeight: 20, marginTop: 8, color: colors.fg2 }}>
            {'Llevas '}
            <Text style={{ fontWeight: '700', color: colors.fg }}>3 semanas progresando</Text>
            {' en press banca. Subimos a '}
            <Text style={{ color: colors.accent, fontWeight: '700' }}>72,5 kg</Text>
            {' el viernes. Sin miedo.'}
          </Text>
        </View>

        {/* CTA */}
        <View style={{ paddingHorizontal: SPACING.md, marginTop: SPACING.md }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('RoutinePreview')}
            style={{
              height: 56, borderRadius: 14, backgroundColor: colors.accent,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '700', color: colors.accentInk, letterSpacing: 1 }}>
              VER ENTRENAMIENTO DE HOY
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
