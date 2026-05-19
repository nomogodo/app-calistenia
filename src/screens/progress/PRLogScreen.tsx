import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const CATEGORIES = ['Todos', 'Fuerza', 'Calistenia', 'Resistencia', 'Hipertrofia'];

const PRS = [
  { t: 'Press banca', v: '82,5 kg', d: '1RM · 19 MAY', isNew: true, k: 'FUERZA' },
  { t: 'Sentadilla profunda', v: '122 kg', d: '1RM · 16 MAY', k: 'FUERZA' },
  { t: 'Front lever aguante', v: '08 seg', d: 'Adv tuck · 14 MAY', isNew: true, k: 'CALI' },
  { t: 'Dominadas estrictas', v: '16 reps', d: 'BW · 12 MAY', k: 'CALI' },
  { t: 'Peso muerto', v: '145 kg', d: '1RM · 09 MAY', k: 'FUERZA' },
  { t: 'Plancha frontal', v: '02:34', d: 'Aguante · 05 MAY', k: 'RESIS' },
];

export function PRLogScreen({ navigation }: any) {
  const colors = useTheme();
  const [cat, setCat] = useState(0);

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
            <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>MURO DE RÉCORDS</Text>
            <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2, color: colors.fg }}>12 PRs</Text>
          </View>
        </View>

        {/* Hero stat */}
        <View style={{ paddingTop: SPACING.md, alignItems: 'center' }}>
          <View style={{ position: 'relative' }}>
            <Text style={[TYPOGRAPHY.mono, { fontSize: 90, lineHeight: 90, letterSpacing: -6, color: colors.fg }]}>12</Text>
            <Text style={{ position: 'absolute', top: -8, right: -32, fontSize: 28 }}>🏆</Text>
          </View>
          <Text style={[TYPOGRAPHY.eyebrow, { marginTop: 4, color: colors.accent }]}>● ESTE MES: +4</Text>
        </View>

        {/* Category filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, gap: 6, flexDirection: 'row' }}
        >
          {CATEGORIES.map((c, i) => (
            <TouchableOpacity
              key={c}
              onPress={() => setCat(i)}
              style={{
                paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99,
                backgroundColor: cat === i ? colors.accent : colors.surface,
                borderWidth: 1, borderColor: cat === i ? colors.accent : colors.line,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: '600', color: cat === i ? colors.accentInk : colors.fg }}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* PR list */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, gap: 8 }}>
          {PRS.map((pr, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14,
                borderRadius: 14,
                backgroundColor: pr.isNew ? `${colors.accent}1A` : colors.surface,
                borderWidth: 1, borderColor: pr.isNew ? colors.accent : colors.line,
              }}
            >
              <View
                style={{
                  width: 44, height: 44, borderRadius: 10,
                  backgroundColor: pr.isNew ? colors.accent : colors.surface2,
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 20, color: pr.isNew ? colors.accentInk : colors.fg2 }}>🏆</Text>
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: colors.fg }}>{pr.t}</Text>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted, marginTop: 3 }]}>{pr.d}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[TYPOGRAPHY.display, { fontSize: 22, color: colors.fg }]}>{pr.v}</Text>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 8, color: colors.muted, letterSpacing: 1, marginTop: 2 }]}>{pr.k}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
