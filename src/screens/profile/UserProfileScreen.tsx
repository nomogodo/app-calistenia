import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/useAppStore';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const ACHIEVEMENTS = [
  { icon: '🔥', l: '30 días', unlocked: true },
  { icon: '🏆', l: '1er PR', unlocked: true },
  { icon: '🏋️', l: '10t total', unlocked: true },
  { icon: '⚡', l: 'Madrugador', unlocked: true },
  { icon: '🎯', l: '100% sem', unlocked: false },
  { icon: '❤️', l: '180 días', unlocked: false },
];

const FAVS = [
  { t: 'Sentadilla profunda', k: '84 sesiones', w: '1RM 122 kg' },
  { t: 'Dominadas estrictas', k: '68 sesiones', w: 'Max 16 reps' },
  { t: 'Press banca', k: '62 sesiones', w: '1RM 82,5 kg' },
];

export function UserProfileScreen({ navigation }: any) {
  const colors = useTheme();
  const { user, rankData } = useAppStore();

  const displayName = user?.name ?? 'Alex Morales';
  const handle = user?.handle ?? '@alexm';
  const xp = user?.xp ?? 2430;
  const level = user?.userLevel ?? 18;
  const xpNext = 3000;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Hero */}
        <View style={{ position: 'relative', paddingHorizontal: SPACING.md, paddingVertical: 20 }}>
          <View
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
              backgroundColor: `${colors.accent}38`,
              opacity: 0.35,
            }}
            pointerEvents="none"
          />
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 16 }}>
            {/* Avatar */}
            <View
              style={{
                width: 84, height: 84, borderRadius: 99,
                backgroundColor: colors.surface2, borderWidth: 2, borderColor: colors.accent,
                alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
              }}
            >
              <Text style={[TYPOGRAPHY.display, { fontSize: 32, color: colors.accent }]}>
                {displayName[0]}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: colors.fg }}>{displayName}</Text>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted, marginTop: 4, letterSpacing: 0.8 }]}>
                {handle} · MIEMBRO DESDE FEB 26
              </Text>
              <View style={{ marginTop: 10, flexDirection: 'row', gap: 6 }}>
                <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, backgroundColor: colors.accent }}>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: colors.accentInk, fontWeight: '700', letterSpacing: 1 }]}>
                    ★ NIVEL {level}
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, backgroundColor: colors.surface2 }}>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: colors.fg2, letterSpacing: 1 }]}>HIPERTROFIA</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              style={{
                width: 36, height: 36, borderRadius: 99,
                backgroundColor: 'rgba(0,0,0,0.4)', borderWidth: 1, borderColor: colors.line2,
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Text style={{ color: colors.fg, fontSize: 16 }}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* XP progress */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: 4 }}>
          <View style={{ padding: 14, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>XP HACIA NIVEL {level + 1}</Text>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.accent }]}>{xp.toLocaleString()} / {xpNext.toLocaleString()}</Text>
            </View>
            <View style={{ height: 6, backgroundColor: colors.surface2, borderRadius: 99, overflow: 'hidden' }}>
              <View style={{ width: `${(xp / xpNext) * 100}%` as any, height: '100%', backgroundColor: colors.accent }} />
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, flexDirection: 'row', gap: 8 }}>
          {[
            { l: 'Racha', v: '23', u: 'días' },
            { l: 'Sesiones', v: '84', u: 'total' },
            { l: 'Récords', v: '12', u: 'PRs' },
          ].map((s, i) => (
            <View key={i} style={{ flex: 1, padding: 14, borderRadius: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }}>
              <Text style={[TYPOGRAPHY.eyebrow, { fontSize: 9, color: colors.muted }]}>{s.l}</Text>
              <Text style={[TYPOGRAPHY.display, { fontSize: 24, marginTop: 4, color: colors.fg }]}>{s.v}</Text>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: colors.muted }]}>{s.u}</Text>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
            <Text style={[TYPOGRAPHY.display, { fontSize: 16, color: colors.fg }]}>Logros</Text>
            <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>14 / 64</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, flexDirection: 'row', paddingBottom: 4 }}>
            {ACHIEVEMENTS.map((a, i) => (
              <View
                key={i}
                style={{
                  width: 78, padding: 12, borderRadius: 12, alignItems: 'center',
                  backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
                  opacity: a.unlocked ? 1 : 0.45,
                }}
              >
                <View
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    backgroundColor: a.unlocked ? `${colors.accent}2E` : colors.surface2,
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 20 }}>{a.icon}</Text>
                </View>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: colors.fg2, marginTop: 6, textAlign: 'center' }]}>{a.l}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Favorite exercises */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>EJERCICIOS FAVORITOS</Text>
          <View style={{ gap: 6 }}>
            {FAVS.map((e, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row', alignItems: 'center', padding: 10, gap: 12,
                  borderRadius: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
                }}
              >
                <View style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: colors.surface2, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 22 }}>🏋️</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: colors.fg }}>{e.t}</Text>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted, marginTop: 2 }]}>{e.k}</Text>
                </View>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.accent }]}>{e.w}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
