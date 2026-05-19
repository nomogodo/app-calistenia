import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const DEFAULT_ITEMS = ['Salmón fresco × 200g', 'Huevos × 4', 'Aguacate × 1', 'Espinacas', 'Tomate cherry', 'Limón'];

const RECIPES = [
  { t: 'Salmón al horno con espinacas y aguacate', m: '742 kcal · 49g P · 22g C · 48g G', match: 98, best: true },
  { t: 'Tortilla de claras con salmón y espinaca', m: '718 kcal · 52g P · 18g C · 41g G', match: 94 },
  { t: 'Tartar de salmón sobre tostada', m: '728 kcal · 44g P · 58g C · 28g G', match: 89 },
];

const TARGETS = [
  { l: 'KCAL', v: '740' },
  { l: 'PROT', v: '48g' },
  { l: 'CARB', v: '62g' },
  { l: 'GRASA', v: '24g' },
];

export function MealSwapperScreen({ navigation }: any) {
  const colors = useTheme();
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [selected, setSelected] = useState(0);

  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));

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
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.accent }]}>● IA EN VIVO</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2, color: colors.fg }}>Recalcular cena</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
        {/* Ingredient chips */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>¿QUÉ TIENES EN LA NEVERA?</Text>
          <View
            style={{
              padding: 14, borderRadius: 14, backgroundColor: colors.surface,
              borderWidth: 1, borderColor: colors.line, minHeight: 80,
              flexDirection: 'row', flexWrap: 'wrap', gap: 6,
            }}
          >
            {items.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => removeItem(i)}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 6,
                  paddingHorizontal: 10, paddingVertical: 6, borderRadius: 99,
                  backgroundColor: `${colors.accent}22`, borderWidth: 1, borderColor: colors.accent,
                }}
              >
                <Text style={{ fontSize: 12, color: colors.accent }}>{item}</Text>
                <Text style={{ fontSize: 10, color: colors.accent }}>✕</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={{
                flexDirection: 'row', alignItems: 'center', gap: 4,
                paddingHorizontal: 10, paddingVertical: 6, borderRadius: 99,
                backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.line,
              }}
            >
              <Text style={{ fontSize: 10, color: colors.fg2 }}>+ Añadir</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Macro targets */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>MACROS OBJETIVO PARA ESTA COMIDA</Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {TARGETS.map((m, i) => (
              <View key={i} style={{ flex: 1, padding: 10, borderRadius: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, alignItems: 'center' }}>
                <Text style={[TYPOGRAPHY.eyebrow, { fontSize: 8, color: colors.muted }]}>{m.l}</Text>
                <Text style={[TYPOGRAPHY.display, { fontSize: 18, marginTop: 4, color: colors.fg }]}>{m.v}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recipe options */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>RECETAS GENERADAS · 3</Text>
          <View style={{ gap: 8 }}>
            {RECIPES.map((r, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setSelected(i)}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12,
                  borderRadius: 14,
                  backgroundColor: selected === i ? `${colors.accent}1E` : colors.surface,
                  borderWidth: 1, borderColor: selected === i ? colors.accent : colors.line,
                }}
              >
                <View style={{ width: 56, height: 56, borderRadius: 10, backgroundColor: colors.surface2, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 26 }}>🍱</Text>
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: colors.fg }} numberOfLines={2}>{r.t}</Text>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted, marginTop: 3 }]}>{r.m}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[TYPOGRAPHY.display, { fontSize: 16, color: colors.accent }]}>{r.match}%</Text>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 8, color: colors.muted, letterSpacing: 1 }]}>MACRO</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={{ position: 'absolute', bottom: 34, left: 0, right: 0, paddingHorizontal: SPACING.md }}>
        <TouchableOpacity
          style={{
            height: 52, borderRadius: 14, backgroundColor: colors.accent,
            flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <Text style={{ color: colors.accentInk, fontSize: 14 }}>✦</Text>
          <Text style={{ fontSize: 14, fontWeight: '700', color: colors.accentInk, letterSpacing: 0.5 }}>
            REGENERAR · 3 NUEVAS OPCIONES
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
