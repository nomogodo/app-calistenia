import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/useAppStore';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const REWARDS = [
  { lv: 20, r: 'Badge Imparable', unlocked: true },
  { lv: 21, r: '100 XP boost', unlocked: true },
  { lv: 22, r: 'Paleta Volt exclusiva', unlocked: true, current: true },
  { lv: 23, r: '1 plan IA gratis' },
  { lv: 24, r: 'Marco avatar Dorado', big: true },
  { lv: 25, r: 'Análisis de técnica x10' },
  { lv: 26, r: 'Sesión con coach humano', big: true },
  { lv: 27, r: 'App icon Gold' },
  { lv: 28, r: 'Camiseta FORGE', big: true },
];

const MISSIONS = [
  { t: 'Entrena 5 días esta semana', p: 4, m: 5, xp: 200 },
  { t: 'Bate un récord personal', p: 1, m: 1, xp: 300, done: true },
  { t: 'Cumple macros 4 días', p: 3, m: 4, xp: 150 },
  { t: 'Score forma > 90 en 3 sesiones', p: 2, m: 3, xp: 250 },
  { t: 'Completa 2 ejercicios de calistenia avanzada', p: 0, m: 2, xp: 200 },
];

export function SeasonPassScreen({ navigation }: any) {
  const colors = useTheme();
  const { seasonMissions } = useAppStore();

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
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.accent }]}>● TEMPORADA 4 · MAYO</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2, color: colors.fg }}>Pase de progreso</Text>
        </View>
        <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.accent }]}>12d</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Level card */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <View
            style={{
              padding: 16, borderRadius: 14,
              backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
              flexDirection: 'row', alignItems: 'center', gap: 14,
            }}
          >
            <View
              style={{
                width: 56, height: 56, borderRadius: 14,
                backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Text style={[TYPOGRAPHY.display, { fontSize: 26, color: colors.accentInk }]}>22</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>NIVEL DE TEMPORADA</Text>
              <View style={{ height: 6, backgroundColor: colors.surface2, borderRadius: 99, marginTop: 8, overflow: 'hidden' }}>
                <View style={{ width: '62%', height: '100%', backgroundColor: colors.accent }} />
              </View>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted, marginTop: 6 }]}>620 / 1.000 XP al nivel 23</Text>
            </View>
          </View>
        </View>

        {/* Tier track */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>RECOMPENSAS · NIVELES 20-28</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, flexDirection: 'row', paddingBottom: 8 }}
          >
            {REWARDS.map((r) => (
              <View
                key={r.lv}
                style={{
                  width: 110, padding: 10, borderRadius: 12, alignItems: 'center',
                  backgroundColor: r.current ? `${colors.accent}2E` : colors.surface,
                  borderWidth: 1, borderColor: r.current ? colors.accent : colors.line,
                  opacity: r.unlocked ? 1 : 0.6,
                }}
              >
                <Text style={[TYPOGRAPHY.mono, {
                  fontSize: 9, letterSpacing: 1, fontWeight: '700',
                  color: r.current ? colors.accent : colors.muted,
                }]}>NV {r.lv}</Text>
                <View
                  style={{
                    height: 70, width: '100%', marginTop: 8, borderRadius: 8,
                    backgroundColor: (r as any).big ? `${colors.accent}22` : colors.bg,
                    borderWidth: 1, borderColor: colors.line,
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Text style={[TYPOGRAPHY.display, { fontSize: 28, color: r.unlocked ? colors.accent : colors.dim }]}>★</Text>
                </View>
                <Text style={{ fontSize: 10, marginTop: 6, fontWeight: '600', lineHeight: 14, textAlign: 'center', color: colors.fg }}>{r.r}</Text>
                {r.unlocked && !r.current && <Text style={{ color: colors.accent, marginTop: 4, fontSize: 12 }}>✓</Text>}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Weekly missions */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>MISIONES SEMANALES</Text>
          <View style={{ gap: 6 }}>
            {MISSIONS.map((m, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12,
                  backgroundColor: m.done ? `${colors.accent}1A` : colors.surface,
                  borderWidth: 1, borderColor: m.done ? colors.accent : colors.line,
                  opacity: m.done ? 0.7 : 1,
                }}
              >
                <View
                  style={{
                    width: 18, height: 18, borderRadius: 5,
                    backgroundColor: m.done ? colors.accent : 'transparent',
                    borderWidth: 1.5, borderColor: m.done ? colors.accent : colors.line2,
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {m.done && <Text style={{ color: colors.accentInk, fontSize: 10, fontWeight: '700' }}>✓</Text>}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, fontWeight: '500', color: colors.fg, textDecorationLine: m.done ? 'line-through' : 'none' }}>{m.t}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <View style={{ flex: 1, height: 3, backgroundColor: colors.surface2, borderRadius: 99, overflow: 'hidden' }}>
                      <View style={{ width: `${(m.p / m.m) * 100}%` as any, height: '100%', backgroundColor: colors.accent }} />
                    </View>
                    <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: colors.muted }]}>{m.p}/{m.m}</Text>
                  </View>
                </View>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.accent, fontWeight: '700' }]}>+{m.xp}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
