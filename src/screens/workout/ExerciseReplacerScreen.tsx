import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const ALTERNATIVES = [
  { t: 'Press banca con mancuernas', m: 'Pecho · ROM mayor', k: 98, best: true },
  { t: 'Press inclinado 30°', m: 'Pecho superior · Estímulo similar', k: 92 },
  { t: 'Flexiones lastradas', m: 'Pecho · Calistenia', k: 85 },
];

export function ExerciseReplacerScreen({ navigation, route }: any) {
  const colors = useTheme();
  const [selected, setSelected] = React.useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => navigation.goBack()}
        activeOpacity={1}
      />

      {/* Bottom sheet */}
      <View
        style={{
          backgroundColor: colors.bg,
          borderTopLeftRadius: 28, borderTopRightRadius: 28,
          borderWidth: 1, borderColor: colors.line,
          borderBottomWidth: 0,
          paddingTop: 12, paddingHorizontal: SPACING.md, paddingBottom: 40,
          maxHeight: '85%',
        }}
      >
        {/* Handle */}
        <View style={{ width: 40, height: 4, borderRadius: 99, backgroundColor: colors.line2, alignSelf: 'center', marginBottom: 16 }} />

        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 18 }}>
          <View
            style={{
              width: 36, height: 36, borderRadius: 10,
              backgroundColor: `${colors.accent}2E`, borderWidth: 1, borderColor: colors.accent,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ color: colors.accent, fontSize: 16 }}>✦</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[TYPOGRAPHY.eyebrow, { color: colors.accent }]}>SUSTITUCIÓN IA</Text>
            <Text style={[TYPOGRAPHY.display, { fontSize: 22, marginTop: 4, color: colors.fg }]}>
              {'Press banca ocupado.\nToma 3 opciones.'}
            </Text>
          </View>
        </View>

        {/* Options */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ gap: 8 }}>
            {ALTERNATIVES.map((o, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setSelected(i)}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 12,
                  padding: 12, borderRadius: 14,
                  backgroundColor: selected === i ? `${colors.accent}1A` : colors.surface,
                  borderWidth: 1,
                  borderColor: selected === i ? colors.accent : colors.line,
                }}
              >
                <View style={{ width: 56, height: 56, borderRadius: 10, backgroundColor: colors.surface2, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 24 }}>💪</Text>
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={{ fontSize: 13, fontWeight: '600', color: colors.fg }} numberOfLines={1}>{o.t}</Text>
                    {o.best && (
                      <View style={{ paddingHorizontal: 5, paddingVertical: 1, borderRadius: 4, backgroundColor: colors.accent }}>
                        <Text style={[TYPOGRAPHY.mono, { fontSize: 8, color: colors.accentInk, fontWeight: '700' }]}>★ TOP</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted, marginTop: 3 }]}>{o.m}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[TYPOGRAPHY.display, { fontSize: 16, color: colors.accent }]}>{o.k}%</Text>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 8, color: colors.muted, letterSpacing: 1 }]}>SIMILAR</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ marginTop: 16, flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                flex: 1, height: 48, borderRadius: 12,
                borderWidth: 1, borderColor: colors.line,
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '700', color: colors.fg }}>CANCELAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                flex: 1, height: 48, borderRadius: 12,
                backgroundColor: colors.accent,
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '700', color: colors.accentInk }}>USAR ESTE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
