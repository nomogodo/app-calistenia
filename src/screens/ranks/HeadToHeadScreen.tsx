import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const STATS = [
  { l: 'Sesiones', a: 14, b: 16, u: '' },
  { l: 'Volumen total', a: 18.2, b: 22.4, u: 't' },
  { l: 'Press banca 1RM', a: 82.5, b: 88, u: ' kg' },
  { l: 'Sentadilla 1RM', a: 122, b: 115, u: ' kg', win: 'a' },
  { l: 'Dominadas', a: 16, b: 14, u: '', win: 'a' },
  { l: 'Score forma medio', a: 92, b: 87, u: '', win: 'a' },
  { l: 'Racha', a: 23, b: 17, u: 'd', win: 'a' },
  { l: 'PRs del mes', a: 4, b: 6, u: '' },
];

export function HeadToHeadScreen({ navigation }: any) {
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
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>DUELO</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2, color: colors.fg }}>Vs Marc T.</Text>
        </View>
        <TouchableOpacity
          style={{
            width: 36, height: 36, borderRadius: 99,
            backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 16 }}>💬</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* VS avatars */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{
              width: 76, height: 76, borderRadius: 99, backgroundColor: colors.accent,
              borderWidth: 2, borderColor: colors.accent, alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={[TYPOGRAPHY.display, { fontSize: 32, fontWeight: '800', color: colors.accentInk }]}>A</Text>
            </View>
            <Text style={{ fontSize: 13, fontWeight: '700', marginTop: 8, color: colors.fg }}>Alex M.</Text>
            <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: '#E8B339', marginTop: 3, fontWeight: '700', letterSpacing: 0.8 }]}>● ORO III</Text>
          </View>
          <Text style={[TYPOGRAPHY.display, { fontSize: 36, color: colors.muted, letterSpacing: -2 }]}>VS</Text>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{
              width: 76, height: 76, borderRadius: 99, backgroundColor: colors.surface2,
              borderWidth: 2, borderColor: colors.line2, alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={[TYPOGRAPHY.display, { fontSize: 32, fontWeight: '800', color: colors.fg }]}>M</Text>
            </View>
            <Text style={{ fontSize: 13, fontWeight: '700', marginTop: 8, color: colors.fg }}>Marc T.</Text>
            <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: '#E8B339', marginTop: 3, fontWeight: '700', letterSpacing: 0.8 }]}>● ORO II</Text>
          </View>
        </View>

        {/* Comparison rows */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>ESTE MES · 23 MAY</Text>
          <View style={{ gap: 6 }}>
            {STATS.map((s, i) => {
              const winA = s.win === 'a' || (s.win === undefined && s.a > s.b);
              const total = s.a + s.b;
              return (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row', alignItems: 'center', padding: 10, gap: 8,
                    borderRadius: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
                  }}
                >
                  <Text style={[TYPOGRAPHY.mono, {
                    fontSize: 14, fontWeight: '700', width: 70, textAlign: 'right',
                    color: winA ? colors.accent : colors.fg2,
                  }]}>{s.a}{s.u}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[TYPOGRAPHY.eyebrow, { fontSize: 9, textAlign: 'center', color: colors.muted }]}>{s.l}</Text>
                    <View style={{ flexDirection: 'row', gap: 4, marginTop: 4 }}>
                      <View style={{ flex: 1, height: 3, backgroundColor: colors.surface2, borderRadius: 99, overflow: 'hidden' }}>
                        <View style={{
                          width: `${(s.a / total) * 100}%` as any,
                          height: '100%',
                          backgroundColor: winA ? colors.accent : colors.line2,
                          marginLeft: 'auto',
                        }} />
                      </View>
                      <View style={{ flex: 1, height: 3, backgroundColor: colors.surface2, borderRadius: 99, overflow: 'hidden' }}>
                        <View style={{
                          width: `${(s.b / total) * 100}%` as any,
                          height: '100%',
                          backgroundColor: !winA ? '#FFB070' : colors.line2,
                        }} />
                      </View>
                    </View>
                  </View>
                  <Text style={[TYPOGRAPHY.mono, {
                    fontSize: 14, fontWeight: '700', width: 70,
                    color: !winA ? '#FFB070' : colors.fg2,
                  }]}>{s.b}{s.u}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Winner chip */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, alignItems: 'center' }}>
          <View style={{
            flexDirection: 'row', padding: 12, borderRadius: 99,
            backgroundColor: 'rgba(255,176,112,0.2)', borderWidth: 1, borderColor: '#FFB070',
            gap: 8, alignItems: 'center',
          }}>
            <Text style={{ fontSize: 16 }}>🏆</Text>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#FFB070' }}>Marc va 5-3 este mes</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <TouchableOpacity
            style={{
              height: 52, borderRadius: 12, backgroundColor: colors.accent,
              flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Text style={{ fontSize: 16 }}>⚡</Text>
            <Text style={{ fontSize: 14, fontWeight: '700', color: colors.accentInk }}>RETAR A UN DUELO SEMANAL</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
