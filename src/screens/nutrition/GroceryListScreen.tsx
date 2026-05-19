import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const SECTIONS = [
  {
    c: 'PROTEÍNAS',
    items: [
      { n: 'Pechuga de pollo', g: '1,2 kg', done: true },
      { n: 'Salmón fresco', g: '800 g', done: false },
      { n: 'Huevos camperos', g: '24 ud', done: true },
      { n: 'Atún en agua', g: '6 latas', done: false },
      { n: 'Yogur griego natural', g: '1 kg', done: false },
    ],
  },
  {
    c: 'HIDRATOS',
    items: [
      { n: 'Arroz basmati', g: '1 kg', done: false },
      { n: 'Avena sin azúcar', g: '500 g', done: true },
      { n: 'Boniato', g: '1 kg', done: true },
      { n: 'Pan integral', g: '1 ud', done: false },
    ],
  },
  {
    c: 'VERDURA Y FRUTA',
    items: [
      { n: 'Brócoli', g: '2 ud', done: false },
      { n: 'Espinacas', g: '300 g', done: false },
      { n: 'Aguacate', g: '4 ud', done: true },
      { n: 'Plátano', g: '6 ud', done: true },
      { n: 'Espárragos', g: '500 g', done: false },
    ],
  },
  {
    c: 'GRASAS Y EXTRAS',
    items: [
      { n: 'Aceite oliva virgen', g: '1L', done: false },
      { n: 'Almendras crudas', g: '500g', done: false },
      { n: 'Café molido', g: '250g', done: true },
    ],
  },
];

const TOTAL = SECTIONS.reduce((acc, s) => acc + s.items.length, 0);
const CHECKED = SECTIONS.reduce((acc, s) => acc + s.items.filter((i) => i.done).length, 0);

export function GroceryListScreen({ navigation }: any) {
  const colors = useTheme();
  const [sections, setSections] = useState(SECTIONS);

  const toggle = (si: number, ii: number) => {
    setSections((prev) =>
      prev.map((s, sIdx) =>
        sIdx !== si ? s : {
          ...s,
          items: s.items.map((item, iIdx) =>
            iIdx !== ii ? item : { ...item, done: !item.done },
          ),
        },
      ),
    );
  };

  const checked = sections.reduce((acc, s) => acc + s.items.filter((i) => i.done).length, 0);

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
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>LISTA DE LA COMPRA</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2, color: colors.fg }}>Semana 19 mayo</Text>
        </View>
        <TouchableOpacity
          style={{
            paddingHorizontal: 12, paddingVertical: 8, borderRadius: 99,
            backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
          }}
        >
          <Text style={{ fontSize: 12, color: colors.fg }}>Compartir</Text>
        </TouchableOpacity>
      </View>

      {/* Progress bar */}
      <View style={{ paddingHorizontal: SPACING.md, paddingTop: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ flex: 1, height: 4, backgroundColor: colors.surface2, borderRadius: 99, overflow: 'hidden' }}>
          <View style={{ width: `${(checked / TOTAL) * 100}%` as any, height: '100%', backgroundColor: colors.accent }} />
        </View>
        <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.muted }]}>{checked} / {TOTAL}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: SPACING.md, paddingTop: SPACING.md, paddingBottom: 40 }}>
        {sections.map((sect, si) => (
          <View key={si} style={{ marginBottom: 18 }}>
            <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 8, color: colors.muted }]}>{sect.c}</Text>
            <View style={{ gap: 4 }}>
              {sect.items.map((item, ii) => (
                <TouchableOpacity
                  key={ii}
                  onPress={() => toggle(si, ii)}
                  style={{
                    flexDirection: 'row', alignItems: 'center', gap: 12,
                    padding: 10, borderRadius: 10,
                    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
                    opacity: item.done ? 0.45 : 1,
                  }}
                >
                  <View
                    style={{
                      width: 18, height: 18, borderRadius: 5,
                      backgroundColor: item.done ? colors.accent : 'transparent',
                      borderWidth: 1.5,
                      borderColor: item.done ? colors.accent : colors.line2,
                      alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    {item.done && <Text style={{ color: colors.accentInk, fontSize: 10, fontWeight: '700' }}>✓</Text>}
                  </View>
                  <Text
                    style={{
                      flex: 1, fontSize: 13, fontWeight: '500', color: colors.fg,
                      textDecorationLine: item.done ? 'line-through' : 'none',
                    }}
                  >
                    {item.n}
                  </Text>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted }]}>{item.g}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
