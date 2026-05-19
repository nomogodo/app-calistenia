import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const POSES = ['Frontal', 'Espalda', 'Perfil L', 'Perfil D', 'Más'];

export function BodyPhotosScreen({ navigation }: any) {
  const colors = useTheme();
  const [pose, setPose] = useState(0);

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
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>FOTOS DE PROGRESO · PRIVADAS</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2, color: colors.fg }}>12 sesiones</Text>
        </View>
        <TouchableOpacity
          style={{
            width: 36, height: 36, borderRadius: 99,
            backgroundColor: colors.accent,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ color: colors.accentInk, fontSize: 18, fontWeight: '700' }}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Comparison */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>COMPARACIÓN · 12 SEMANAS</Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {[
              { label: 'FOTO ANTES', date: '26 FEB', weight: '74,2 kg', today: false },
              { label: 'FOTO HOY', date: '19 MAY', weight: '78,4 kg', today: true },
            ].map((p, i) => (
              <View key={i} style={{ flex: 1 }}>
                <View
                  style={{
                    height: 260, borderRadius: 12,
                    backgroundColor: colors.surface2,
                    borderWidth: 1, borderColor: p.today ? colors.accent : colors.line,
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: colors.muted }]}>{p.label}</Text>
                  <Text style={{ fontSize: 28, marginTop: 8 }}>📸</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted }]}>{p.date}</Text>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.accent, fontWeight: p.today ? '700' : '400' }]}>
                    {p.weight}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Pose tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, gap: 6, flexDirection: 'row' }}
        >
          {POSES.map((p, i) => (
            <TouchableOpacity
              key={p}
              onPress={() => setPose(i)}
              style={{
                paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99,
                backgroundColor: pose === i ? colors.accent : colors.surface,
                borderWidth: 1, borderColor: pose === i ? colors.accent : colors.line,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: '600', color: pose === i ? colors.accentInk : colors.fg }}>{p}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Timeline grid */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>HISTORIAL</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <View key={i} style={{ width: '31%' }}>
                <View
                  style={{
                    height: 100, borderRadius: 8,
                    backgroundColor: colors.surface2,
                    borderWidth: 1, borderColor: colors.line,
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 8, color: colors.muted }]}>SEM {12 - i}</Text>
                  <Text style={{ fontSize: 18, marginTop: 4 }}>📸</Text>
                </View>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 8, color: colors.muted, marginTop: 4 }]}>
                  {(78.4 - i * 0.35).toFixed(1)} kg
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
