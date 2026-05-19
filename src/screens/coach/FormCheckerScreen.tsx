import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const SCORES = [
  { l: 'Profundidad', v: 92 },
  { l: 'Inclinación torso', v: 64 },
  { l: 'Alineación rodillas', v: 88 },
  { l: 'Tempo', v: 72 },
];

const CORRECTIONS = [
  { ts: '00:01', c: '#FF6B6B', t: 'Caes adelante 12° en la fase concéntrica. Mete aire y bloquea core.', l: 'Crítico' },
  { ts: '00:03', c: '#FFB070', t: 'Rodilla derecha colapsa hacia dentro 4°. Activa glúteo medio.', l: 'Atención' },
  { ts: '00:05', c: '#FFB070', t: 'Subes más rápido que bajas. Tempo objetivo 3-0-1.', l: 'Atención' },
];

export function FormCheckerScreen({ navigation }: any) {
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
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.accent }]}>● ANÁLISIS DE TÉCNICA</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2, color: colors.fg }}>Sentadilla · Serie 2</Text>
        </View>
        <TouchableOpacity
          style={{
            width: 36, height: 36, borderRadius: 99,
            backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ color: colors.fg }}>⋯</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Comparison frame */}
        <View
          style={{
            marginTop: SPACING.md, marginHorizontal: SPACING.md,
            height: 260, borderRadius: 16, overflow: 'hidden',
            backgroundColor: colors.surface2,
            borderWidth: 1, borderColor: colors.line,
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {/* You */}
            <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: colors.line, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ position: 'absolute', top: 8, left: 8, paddingHorizontal: 7, paddingVertical: 3, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 4 }}>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 8, color: colors.accent, fontWeight: '700', letterSpacing: 1 }]}>TÚ</Text>
              </View>
              <Text style={{ fontSize: 40 }}>🧘</Text>
              {/* Error marker */}
              <Svg style={{ position: 'absolute', top: 0, left: 0 }} width="100%" height="100%">
                <Circle cx={60} cy={100} r={6} fill="#FF6B6B" opacity={0.9} />
                <Circle cx={60} cy={100} r={11} fill="none" stroke="#FF6B6B" strokeWidth={1.5} opacity={0.5} />
              </Svg>
            </View>
            {/* AI ideal */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ position: 'absolute', top: 8, left: 8, paddingHorizontal: 7, paddingVertical: 3, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 4 }}>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 8, color: colors.accent, fontWeight: '700', letterSpacing: 1 }]}>IDEAL · IA</Text>
              </View>
              <Text style={{ fontSize: 40, opacity: 0.7 }}>🧘</Text>
            </View>
          </View>
          {/* Play controls */}
          <View
            style={{
              position: 'absolute', bottom: 8, left: 8, right: 8,
              flexDirection: 'row', alignItems: 'center', gap: 8,
            }}
          >
            <TouchableOpacity
              style={{
                width: 32, height: 32, borderRadius: 99,
                backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Text style={{ color: colors.accentInk, fontSize: 12 }}>▶</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, height: 3, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 99 }}>
              <View style={{ width: '42%', height: '100%', backgroundColor: colors.accent, borderRadius: 99 }} />
            </View>
            <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.fg }]}>00:03 / 00:07</Text>
          </View>
        </View>

        {/* Form score */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>SCORE GLOBAL</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Text style={[TYPOGRAPHY.display, { fontSize: 64, lineHeight: 64, letterSpacing: -4, color: colors.fg }]}>76</Text>
            <View style={{ flex: 1, gap: 4 }}>
              {SCORES.map((b, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 3 }}>
                  <Text style={{ flex: 1, fontSize: 10, color: colors.fg2 }}>{b.l}</Text>
                  <View style={{ width: 70, height: 3, backgroundColor: colors.surface2, borderRadius: 99, overflow: 'hidden' }}>
                    <View style={{
                      width: `${b.v}%` as any, height: '100%',
                      backgroundColor: b.v < 70 ? '#FF8080' : colors.accent,
                    }} />
                  </View>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: colors.muted, width: 18 }]}>{b.v}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Corrections */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>CORRECCIONES · 3 PUNTOS</Text>
          <View style={{ gap: 6 }}>
            {CORRECTIONS.map((c, i) => (
              <View
                key={i}
                style={{
                  padding: 12, borderRadius: 10,
                  backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, backgroundColor: colors.surface2 }}>
                    <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: c.c, fontWeight: '700', letterSpacing: 0.8 }]}>● {c.ts}</Text>
                  </View>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: c.c, letterSpacing: 0.8 }]}>{c.l.toUpperCase()}</Text>
                </View>
                <Text style={{ fontSize: 12, color: colors.fg2, marginTop: 6, lineHeight: 18 }}>{c.t}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View
        style={{
          position: 'absolute', bottom: 34, left: 0, right: 0,
          paddingHorizontal: SPACING.md, paddingVertical: 14,
          flexDirection: 'row', gap: 8,
        }}
      >
        <TouchableOpacity
          style={{
            width: 56, height: 48, borderRadius: 12,
            borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 18 }}>📷</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1, height: 48, borderRadius: 12, backgroundColor: colors.accent,
            flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <Text style={{ color: colors.accentInk, fontSize: 14 }}>✦</Text>
          <Text style={{ fontSize: 14, fontWeight: '700', color: colors.accentInk }}>REPETIR EJERCICIO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
