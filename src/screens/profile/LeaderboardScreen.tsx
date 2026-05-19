import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const FILTERS = ['Amigos', 'Mundial', 'España', 'Mi gym'];

const PODIUM = [
  { n: 'Lucía R.', pts: 18, p: 2, h: 90 },
  { n: 'Marc T.', pts: 19, p: 1, h: 110 },
  { n: 'Alex M.', pts: 14, p: 3, h: 70, you: true },
];

const LIST = [
  { p: 4, n: 'Sara P.', g: '@sarapl', pts: 13 },
  { p: 5, n: 'David O.', g: '@davito', pts: 12 },
  { p: 6, n: 'Carla M.', g: '@carlam', pts: 11 },
  { p: 7, n: 'Pablo Z.', g: '@pabloz', pts: 10 },
  { p: 8, n: 'Marta L.', g: '@martal', pts: 9 },
];

export function LeaderboardScreen({ navigation }: any) {
  const colors = useTheme();
  const [filter, setFilter] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
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
            <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>RETO DEL MES · MAYO</Text>
            <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2, color: colors.fg }}>Consistencia</Text>
          </View>
        </View>

        {/* Challenge card */}
        <View
          style={{
            marginTop: SPACING.md, marginHorizontal: SPACING.md, padding: 18,
            borderRadius: 16, backgroundColor: `${colors.accent}1A`, borderWidth: 1, borderColor: colors.accent,
          }}
        >
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.accent }]}>● ACTIVO · 12 DÍAS RESTANTES</Text>
          <Text style={[TYPOGRAPHY.display, { fontSize: 26, marginTop: 8, lineHeight: 28, color: colors.fg }]}>
            {'Entrena 20 días\nen mayo.'}
          </Text>
          <View style={{ marginTop: 14, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 11, color: colors.fg2 }}>Tu progreso</Text>
            <Text style={{ fontSize: 11, color: colors.fg2 }}>
              <Text style={[TYPOGRAPHY.mono, { color: colors.accent, fontWeight: '700' }]}>14 / 20</Text>
              {' · top 12%'}
            </Text>
          </View>
          <View style={{ marginTop: 8, height: 6, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 99, overflow: 'hidden' }}>
            <View style={{ width: '70%', height: '100%', backgroundColor: colors.accent }} />
          </View>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, gap: 6, flexDirection: 'row' }}
        >
          {FILTERS.map((t, i) => (
            <TouchableOpacity
              key={t}
              onPress={() => setFilter(i)}
              style={{
                paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99,
                backgroundColor: filter === i ? colors.accent : colors.surface,
                borderWidth: 1, borderColor: filter === i ? colors.accent : colors.line,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: '600', color: filter === i ? colors.accentInk : colors.fg }}>{t}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Podium */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
          {PODIUM.map((p, i) => (
            <View key={i} style={{ flex: 1, alignItems: 'center' }}>
              <View
                style={{
                  width: 56, height: 56, borderRadius: 99,
                  backgroundColor: p.you ? colors.accent : colors.surface2,
                  borderWidth: 2,
                  borderColor: p.p === 1 || p.you ? colors.accent : colors.line2,
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Text style={[TYPOGRAPHY.display, {
                  fontSize: 22, fontWeight: '800',
                  color: p.you ? colors.accentInk : colors.fg,
                }]}>{p.n[0]}</Text>
              </View>
              <Text style={{ fontSize: 11, fontWeight: '600', marginTop: 6, color: colors.fg }}>{p.n}</Text>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: colors.muted }]}>{p.pts} días</Text>
              <View
                style={{
                  marginTop: 8, height: p.h, width: '100%',
                  borderTopLeftRadius: 8, borderTopRightRadius: 8,
                  backgroundColor: p.p === 1 ? colors.accent
                    : p.you ? `${colors.accent}4D`
                    : colors.surface2,
                  borderWidth: 1, borderColor: p.you ? colors.accent : colors.line,
                  alignItems: 'center', paddingTop: 8,
                }}
              >
                <Text style={[TYPOGRAPHY.display, { fontSize: 22, color: p.p === 1 ? colors.accentInk : colors.fg }]}>{p.p}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Full list */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, gap: 4 }}>
          {LIST.map((r) => (
            <View
              key={r.p}
              style={{
                flexDirection: 'row', alignItems: 'center', padding: 10, gap: 12,
                borderRadius: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
              }}
            >
              <Text style={[TYPOGRAPHY.mono, { fontSize: 12, color: colors.muted, width: 22 }]}>{r.p}</Text>
              <View style={{ width: 32, height: 32, borderRadius: 99, backgroundColor: colors.surface2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: colors.fg }}>{r.n[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: colors.fg }}>{r.n}</Text>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: colors.muted }]}>{r.g}</Text>
              </View>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.accent }]}>{r.pts} días</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
