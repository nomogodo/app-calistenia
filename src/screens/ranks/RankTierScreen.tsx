import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { RankInsignia } from '../../components/RankInsignia';

const SUBDIVISIONS = [
  { d: 'Oro V', x: '3.500', c: 'Recluta del Oro' },
  { d: 'Oro IV', x: '4.000', c: 'Consolidado' },
  { d: 'Oro III', x: '4.500', c: 'Tu posición', current: true },
  { d: 'Oro II', x: '5.500', c: 'Próximo objetivo' },
  { d: 'Oro I', x: '6.500', c: 'Antesala de Platino' },
];

const PERKS = [
  { icon: '✦', t: 'Acceso a planes IA avanzados' },
  { icon: '🏆', t: 'Marco de avatar dorado' },
  { icon: '📷', t: '10 análisis de técnica/mes' },
  { icon: '⚡', t: 'Multiplicador XP x1,2' },
  { icon: '💬', t: 'Prioridad en chat con el coach' },
];

export function RankTierScreen({ navigation, route }: any) {
  const colors = useTheme();
  const tier = route?.params?.tier ?? 'oro';
  const tierColor = '#E8B339';

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Header */}
        <View
          style={{
            paddingHorizontal: SPACING.md, paddingTop: SPACING.md, paddingBottom: 32,
            backgroundColor: `${tierColor}2A`,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: 36, height: 36, borderRadius: 99,
                backgroundColor: 'rgba(0,0,0,0.4)', borderWidth: 1, borderColor: colors.line2,
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Text style={{ color: colors.fg }}>←</Text>
            </TouchableOpacity>
            <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>DETALLE DEL RANGO</Text>
            <View style={{ width: 36 }} />
          </View>

          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <RankInsignia tier={tier} size={160} />
            <Text style={[TYPOGRAPHY.display, { fontSize: 44, marginTop: 18, color: tierColor }]}>ORO</Text>
            <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.fg2, marginTop: 6, letterSpacing: 1 }]}>
              3.500 - 7.000 XP · TOP 25% MUNDIAL
            </Text>
          </View>

          <Text style={{ marginTop: 18, fontSize: 14, color: colors.fg2, lineHeight: 22, textAlign: 'center' }}>
            {'El rango Oro es donde la disciplina se vuelve hábito. '}
            <Text style={{ color: tierColor, fontWeight: '700' }}>Hace años que dejaste de buscar excusas.</Text>
          </Text>
        </View>

        {/* Subdivisions */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>SUB-DIVISIONES</Text>
          <View style={{ gap: 4 }}>
            {SUBDIVISIONS.map((sub, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 12,
                  padding: 10, borderRadius: 10,
                  backgroundColor: sub.current ? `${tierColor}28` : colors.surface,
                  borderWidth: 1, borderColor: sub.current ? tierColor : colors.line,
                }}
              >
                <View
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    backgroundColor: colors.surface2, alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '800', color: tierColor }}>{sub.d.split(' ')[1]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: tierColor }}>{sub.d}</Text>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: colors.muted, marginTop: 2 }]}>{sub.c}</Text>
                </View>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.muted }]}>{sub.x} XP</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Perks */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>BENEFICIOS DEL RANGO ORO</Text>
          <View style={{ gap: 6 }}>
            {PERKS.map((p, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12,
                  borderRadius: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
                }}
              >
                <View
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    backgroundColor: `${tierColor}2E`, alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{p.icon}</Text>
                </View>
                <Text style={{ flex: 1, fontSize: 13, color: colors.fg }}>{p.t}</Text>
                <Text style={{ color: tierColor, fontSize: 14 }}>✓</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
