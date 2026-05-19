import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const INGREDIENTS = [
  { n: 'Pechuga de pollo', g: 180, k: 198 },
  { n: 'Arroz basmati cocido', g: 200, k: 260 },
  { n: 'Brócoli al vapor', g: 150, k: 51 },
  { n: 'Aceite de oliva virgen', g: 12, k: 108 },
  { n: 'Almendras crudas', g: 25, k: 144 },
];

const STEPS = [
  'Salpimenta el pollo y márcalo en plancha 6 min por lado.',
  'Pon el arroz a hervir con sal 12 min, escúrrelo.',
  'Cuece el brócoli al vapor 5 min, manténlo al dente.',
  'Mezcla con AOVE y almendras laminadas. Sirve.',
];

export function MealDetailScreen({ navigation }: any) {
  const colors = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Hero */}
      <View style={{ height: 220, backgroundColor: colors.surface2, justifyContent: 'flex-end' }}>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 40 }}>🍗</Text>
        </View>
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
        <View style={{ position: 'absolute', top: 12, right: 16, flexDirection: 'row', gap: 8 }}>
          {['♥', '⋯'].map((icon, i) => (
            <TouchableOpacity
              key={i}
              style={{
                width: 38, height: 38, borderRadius: 99,
                backgroundColor: 'rgba(0,0,0,0.5)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Text style={{ color: colors.fg, fontSize: 16 }}>{icon}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ padding: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>COMIDA · 13:30</Text>
          <Text style={[TYPOGRAPHY.display, { fontSize: 26, marginTop: 6, color: colors.fg }]}>Pollo con arroz y brócoli</Text>
          <View style={{ marginTop: 12, flexDirection: 'row', gap: 18, alignItems: 'baseline' }}>
            {[
              { v: '780', u: 'kcal' },
              { v: '55', u: 'g P' },
              { v: '98', u: 'g C' },
              { v: '18', u: 'g G' },
            ].map((s, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 16, fontWeight: '700', color: colors.fg }]}>{s.v}</Text>
                <Text style={{ fontSize: 12, color: colors.fg2 }}>{s.u}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Ingredients */}
        <View style={{ paddingHorizontal: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>INGREDIENTES</Text>
          {INGREDIENTS.map((ing, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row', alignItems: 'center', gap: 12,
                paddingVertical: 10,
                borderBottomWidth: 1, borderBottomColor: colors.line,
              }}
            >
              <Text style={{ flex: 1, fontSize: 13, color: colors.fg }}>{ing.n}</Text>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.muted, width: 50, textAlign: 'right' }]}>{ing.g}g</Text>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.accent, width: 55, textAlign: 'right' }]}>{ing.k} kcal</Text>
            </View>
          ))}
        </View>

        {/* Prep steps */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>PREPARACIÓN · 25 MIN</Text>
          {STEPS.map((s, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 12, paddingVertical: 8 }}>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.accent, width: 22, fontWeight: '700' }]}>
                {String(i + 1).padStart(2, '0')}
              </Text>
              <Text style={{ flex: 1, fontSize: 13, lineHeight: 20, color: colors.fg2 }}>{s}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <View style={{ paddingHorizontal: SPACING.md, marginTop: SPACING.md, flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity
            style={{
              width: 56, height: 48, borderRadius: 12,
              borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ color: colors.accent, fontSize: 18 }}>✦</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1, height: 48, borderRadius: 12, backgroundColor: colors.accent,
              flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Text style={{ color: colors.accentInk, fontSize: 16 }}>✓</Text>
            <Text style={{ fontSize: 14, fontWeight: '700', color: colors.accentInk }}>REGISTRAR COMIDA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
