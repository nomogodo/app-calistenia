import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { RankInsignia, RANKS } from '../../components/RankInsignia';

const GROUP = [
  { p: 1, n: 'Marc T.', pts: 4920, zone: 'promo' },
  { p: 2, n: 'Lucía R.', pts: 4880, zone: 'promo' },
  { p: 3, n: 'Diego H.', pts: 4865, zone: 'promo' },
  { p: 4, n: 'Alex M.', pts: 4820, zone: 'promo', you: true },
  { p: 5, n: 'Carla M.', pts: 4760 },
  { p: 6, n: 'Pablo Z.', pts: 4710 },
  { p: 7, n: 'Sara P.', pts: 4640 },
  { p: 18, n: 'Marta L.', pts: 3920, zone: 'demo' },
  { p: 19, n: 'David O.', pts: 3850, zone: 'demo' },
  { p: 20, n: 'Iván T.', pts: 3780, zone: 'demo' },
];

export function LeagueScreen({ navigation }: any) {
  const colors = useTheme();

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
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>LIGA · TEMPORADA 4</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2, color: colors.fg }}>División Oro</Text>
        </View>
        <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.accent }]}>12d restantes</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Group standings */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <View style={{ padding: 16, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }}>
            <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 14, color: colors.muted }]}>POSICIONES · GRUPO #4821</Text>

            {GROUP.map((r, i) => {
              const showPromo = i === 4;
              const showDemo = i === 7;
              return (
                <React.Fragment key={r.p}>
                  {showPromo && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8 }}>
                      <View style={{ flex: 1, height: 1, backgroundColor: `${colors.accent}66` }} />
                      <Text style={[TYPOGRAPHY.mono, { fontSize: 8, color: colors.accent, letterSpacing: 1, fontWeight: '700' }]}>↑ ZONA ASCENSO</Text>
                      <View style={{ flex: 1, height: 1, backgroundColor: `${colors.accent}66` }} />
                    </View>
                  )}
                  {showDemo && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8 }}>
                      <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,107,107,0.4)' }} />
                      <Text style={[TYPOGRAPHY.mono, { fontSize: 8, color: '#FF6B6B', letterSpacing: 1, fontWeight: '700' }]}>↓ ZONA DESCENSO</Text>
                      <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,107,107,0.4)' }} />
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: 'row', alignItems: 'center', gap: 10,
                      padding: 8, borderRadius: 8,
                      backgroundColor: r.you ? `${colors.accent}22` : 'transparent',
                      borderWidth: 1, borderColor: r.you ? colors.accent : 'transparent',
                    }}
                  >
                    <Text style={[TYPOGRAPHY.mono, { fontSize: 12, color: colors.muted, width: 22 }]}>{r.p}</Text>
                    <View style={{ width: 28, height: 28, borderRadius: 99, backgroundColor: colors.surface2, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 12, fontWeight: '700', color: colors.fg }}>{r.n[0]}</Text>
                    </View>
                    <Text style={{ flex: 1, fontSize: 12, fontWeight: r.you ? '700' : '500', color: colors.fg }}>
                      {r.n}{r.you && <Text style={{ color: colors.accent, fontSize: 10 }}> · TÚ</Text>}
                    </Text>
                    <Text style={[TYPOGRAPHY.mono, {
                      fontSize: 11,
                      color: r.zone === 'promo' ? colors.accent : r.zone === 'demo' ? '#FF8080' : colors.fg2,
                    }]}>{r.pts}</Text>
                  </View>
                </React.Fragment>
              );
            })}
          </View>
        </View>

        {/* Division ladder */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>ESCALERA DE DIVISIONES</Text>
          <View style={{ gap: 4 }}>
            {[...RANKS].reverse().map((tier) => {
              const isCurrent = tier.id === 'oro';
              return (
                <TouchableOpacity
                  key={tier.id}
                  onPress={() => navigation.navigate('RankTier', { tier: tier.id })}
                  style={{
                    flexDirection: 'row', alignItems: 'center', gap: 12,
                    padding: 10, borderRadius: 10,
                    backgroundColor: isCurrent ? `${tier.c}28` : colors.surface,
                    borderWidth: 1, borderColor: isCurrent ? tier.c : colors.line,
                    opacity: ['maestro', 'elite', 'diamante', 'platino'].includes(tier.id) ? 0.7 : 1,
                  }}
                >
                  <RankInsignia tier={tier.id} size={40} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: tier.c }}>{tier.t}</Text>
                  </View>
                  {isCurrent && (
                    <View style={{ paddingHorizontal: 7, paddingVertical: 3, borderRadius: 4, backgroundColor: `${tier.c}40` }}>
                      <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: tier.c, fontWeight: '700', letterSpacing: 0.8 }]}>● TÚ</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
