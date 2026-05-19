import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const PRS = [
  { t: 'Press banca', o: '70 kg', n: '72,5 kg', d: '+2,5 kg' },
  { t: 'Fondos en paralelas', o: '14 reps', n: '16 reps', d: '+2 reps' },
];

const FORM_BARS = [
  { l: 'Forma', v: 95 },
  { l: 'Tempo', v: 88 },
  { l: 'ROM', v: 96 },
  { l: 'Concentración', v: 87 },
];

export function WorkoutSummaryScreen({ navigation }: any) {
  const colors = useTheme();
  const [rpe, setRpe] = useState(7);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero */}
        <View
          style={{
            paddingHorizontal: SPACING.md, paddingTop: 32, paddingBottom: 28,
            backgroundColor: `${colors.accent}28`,
          }}
        >
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.accent }]}>● COMPLETADO · 52:18</Text>
          <Text style={[TYPOGRAPHY.display, { fontSize: 38, marginTop: 10, lineHeight: 40, color: colors.fg }]}>
            {'Trabajo hecho.\n'}
            <Text style={{ color: colors.accent }}>+ 2 PR.</Text>
          </Text>
          <View style={{ marginTop: 14, flexDirection: 'row', gap: 14 }}>
            {[
              { l: 'Volumen', v: '6.840', u: 'kg' },
              { l: 'Series', v: '27', u: '' },
              { l: 'Calorías', v: '438', u: 'kcal' },
            ].map((s, i) => (
              <View key={i}>
                <Text style={[TYPOGRAPHY.display, { fontSize: 26, lineHeight: 28, color: colors.fg }]}>
                  {s.v}
                  <Text style={{ fontSize: 12, color: colors.muted }}>{s.u ? ` ${s.u}` : ''}</Text>
                </Text>
                <Text style={[TYPOGRAPHY.eyebrow, { marginTop: 4, fontSize: 9, color: colors.muted }]}>{s.l}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* PRs */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>RÉCORDS PERSONALES</Text>
          {PRS.map((pr, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row', alignItems: 'center', gap: 14,
                padding: 14, marginBottom: 8, borderRadius: 14,
                backgroundColor: `${colors.accent}1A`, borderWidth: 1, borderColor: colors.accent,
              }}
            >
              <Text style={{ fontSize: 22 }}>🏆</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: colors.fg }}>{pr.t}</Text>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.muted, marginTop: 2 }]}>
                  {pr.o} →{' '}
                  <Text style={{ color: colors.accent }}>{pr.n}</Text>
                  {' · '}
                  <Text style={{ color: colors.accent, fontWeight: '700' }}>{pr.d}</Text>
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Form quality */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>CALIDAD DE EJECUCIÓN</Text>
          <View style={{ padding: 16, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Text style={[TYPOGRAPHY.display, { fontSize: 48, color: colors.fg }]}>92</Text>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.accent }]}>+ 4 vs últ. sesión</Text>
            </View>
            <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted, letterSpacing: 1 }]}>SCORE GLOBAL · IA</Text>
            <View style={{ marginTop: 14, gap: 6 }}>
              {FORM_BARS.map((b, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Text style={{ width: 110, fontSize: 12, color: colors.fg2 }}>{b.l}</Text>
                  <View style={{ flex: 1, height: 4, backgroundColor: colors.surface2, borderRadius: 99, overflow: 'hidden' }}>
                    <View style={{ width: `${b.v}%` as any, height: '100%', backgroundColor: colors.accent }} />
                  </View>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted, width: 28, textAlign: 'right' }]}>{b.v}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* RPE selector */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>¿CÓMO TE HAS SENTIDO? · RPE</Text>
          <View style={{ flexDirection: 'row', gap: 3 }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setRpe(i + 1)}
                style={{
                  flex: 1, height: 36, borderRadius: 6, alignItems: 'center', justifyContent: 'center',
                  backgroundColor: rpe === i + 1 ? colors.accent : colors.surface,
                  borderWidth: 1, borderColor: rpe === i + 1 ? colors.accent : colors.line,
                }}
              >
                <Text
                  style={[TYPOGRAPHY.mono, {
                    fontSize: 11, fontWeight: '700',
                    color: rpe === i + 1 ? colors.accentInk : colors.fg2,
                  }]}
                >
                  {i + 1}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted, textAlign: 'center', marginTop: 8, letterSpacing: 0.8 }]}>
            1 MUY FÁCIL · 10 FALLO TOTAL
          </Text>
        </View>

        <View style={{ paddingHorizontal: SPACING.md, marginTop: SPACING.md }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('WorkoutHub')}
            style={{
              height: 56, borderRadius: 14, backgroundColor: colors.accent,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '700', color: colors.accentInk, letterSpacing: 1 }}>CERRAR SESIÓN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
