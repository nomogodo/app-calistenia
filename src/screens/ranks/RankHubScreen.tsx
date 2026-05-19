import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/useAppStore';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { RankInsignia } from '../../components/RankInsignia';

const XP_SOURCES = [
  { icon: '🏋️', t: 'Completar entreno', v: '+80 XP' },
  { icon: '🏆', t: 'Batir un récord personal', v: '+200 XP' },
  { icon: '🔥', t: 'Mantener racha 7 días', v: '+150 XP' },
  { icon: '✓', t: 'Cumplir macros del día', v: '+50 XP' },
  { icon: '✦', t: 'Score forma > 90', v: '+30 XP' },
  { icon: '🎯', t: 'Completar reto mensual', v: '+500 XP' },
];

export function RankHubScreen({ navigation }: any) {
  const colors = useTheme();
  const { rankData } = useAppStore();

  const currentTier = rankData?.tier ?? 'oro';
  const division = rankData?.division ?? 'ORO III';
  const currentXp = rankData?.xp ?? 4820;
  const earnedXp = rankData?.xpToNext ?? 820;
  const tierXp = rankData?.xpTarget ?? 1200;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Hero */}
        <View
          style={{
            paddingHorizontal: SPACING.md, paddingTop: SPACING.md, paddingBottom: 28,
            backgroundColor: `${colors.accent}1A`,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>RANGO ACTUAL {'·'} TEMPORADA 4</Text>
            <TouchableOpacity
              style={{
                width: 32, height: 32, borderRadius: 99,
                backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Text style={{ color: colors.fg }}>{'⋯'}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', marginTop: 18 }}>
            <RankInsignia tier={currentTier} size={140} />
            <Text style={[TYPOGRAPHY.display, { fontSize: 38, marginTop: 14, color: '#E8B339', letterSpacing: -1 }]}>
              {division}
            </Text>
            <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.fg2, marginTop: 4, letterSpacing: 1 }]}>
              {currentXp.toLocaleString()} XP {'·'} TOP 18% MUNDIAL
            </Text>
          </View>

          {/* Progress bar */}
          <View
            style={{
              marginTop: 22, padding: 14, borderRadius: 14,
              backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>PROGRESO A ORO II</Text>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.accent }]}>
                {earnedXp} {' / '} {tierXp} XP
              </Text>
            </View>
            <View style={{ height: 8, backgroundColor: colors.surface2, borderRadius: 99, overflow: 'hidden' }}>
              <View style={{ width: `${(earnedXp / tierXp) * 100}%` as any, height: '100%', backgroundColor: colors.accent }} />
            </View>
            <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted, marginTop: 8 }]}>
              {'FALTAN '}
              <Text style={{ color: colors.accent, fontWeight: '700' }}>{tierXp - earnedXp} XP</Text>
              {' · ~5 ENTRENOS'}
            </Text>
          </View>
        </View>

        {/* XP sources */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>{'¿CÓMO GANAS XP?'}</Text>
          <View style={{ gap: 6 }}>
            {XP_SOURCES.map((s, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 12,
                  padding: 10, borderRadius: 10,
                  backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
                }}
              >
                <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: colors.surface2, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 16 }}>{s.icon}</Text>
                </View>
                <Text style={{ flex: 1, fontSize: 13, color: colors.fg }}>{s.t}</Text>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.accent, fontWeight: '700' }]}>{s.v}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTAs */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('League')}
            style={{
              flex: 1, height: 56, borderRadius: 12,
              borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface,
              alignItems: 'center', justifyContent: 'center', gap: 4,
            }}
          >
            <Text style={{ fontSize: 18 }}>{'🏆'}</Text>
            <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.accent }]}>VER LIGAS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('HeadToHead')}
            style={{
              flex: 1, height: 56, borderRadius: 12,
              borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface,
              alignItems: 'center', justifyContent: 'center', gap: 4,
            }}
          >
            <Text style={{ fontSize: 18 }}>{'🤚'}</Text>
            <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.accent }]}>VS AMIGOS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
