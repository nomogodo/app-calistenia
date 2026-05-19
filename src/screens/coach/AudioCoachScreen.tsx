import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/useAppStore';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const VOICES = [
  { id: 'drill', t: 'Sargento', d: 'Intenso. Directo. Sin tonterías.', w: [8, 6, 9, 4, 8, 5, 9, 6, 8] },
  { id: 'scientist', t: 'Científico', d: 'Datos, métricas y precisión técnica.', w: [4, 5, 3, 6, 4, 5, 4, 6, 5] },
  { id: 'zen', t: 'Mindful', d: 'Calmado. Foco en respiración y control.', w: [3, 4, 2, 5, 3, 4, 3, 5, 3] },
  { id: 'hype', t: 'Hype Beast', d: 'Energía alta. Música alta. Vamos.', w: [9, 8, 10, 7, 9, 8, 10, 7, 9] },
];

const TOGGLES = [
  { l: 'Música de fondo durante entreno', v: true },
  { l: 'Cuenta atrás en descansos', v: true },
  { l: 'Anuncia récords personales', v: true },
  { l: 'Vibración táctil con feedback', v: false },
  { l: 'Modo silencio en lugares públicos', v: false },
];

export function AudioCoachScreen({ navigation }: any) {
  const colors = useTheme();
  const { user, setUser } = useAppStore();
  const [selected, setSelected] = useState<string>(user?.coachPersonality ?? 'drill');
  const [toggles, setToggles] = useState(TOGGLES.map((t) => t.v));
  const [feedbackSlider] = useState(0.6);

  const handleSelect = (id: string) => {
    setSelected(id);
    if (user) setUser({ ...user, coachPersonality: id as any });
  };

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
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>COACH IA · AUDIO</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2, color: colors.fg }}>Personalidad</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Voice selector */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>VOZ DEL COACH</Text>
          <View style={{ gap: 8 }}>
            {VOICES.map((v) => (
              <TouchableOpacity
                key={v.id}
                onPress={() => handleSelect(v.id)}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 14,
                  padding: 14, borderRadius: 14,
                  backgroundColor: selected === v.id ? `${colors.accent}1E` : colors.surface,
                  borderWidth: 1, borderColor: selected === v.id ? colors.accent : colors.line,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 40, height: 40, borderRadius: 99,
                    backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.line2,
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: selected === v.id ? colors.accent : colors.fg2, fontSize: 14 }}>▶</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: colors.fg }}>{v.t}</Text>
                  <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }}>{v.d}</Text>
                </View>
                {/* Mini waveform */}
                <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center', height: 18 }}>
                  {v.w.map((h, i) => (
                    <View
                      key={i}
                      style={{
                        width: 2, height: h,
                        backgroundColor: selected === v.id ? colors.accent : colors.line2,
                        borderRadius: 1,
                      }}
                    />
                  ))}
                </View>
                {selected === v.id && <Text style={{ color: colors.accent, fontSize: 16 }}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Feedback frequency */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>FRECUENCIA DE FEEDBACK</Text>
          <View style={{ padding: 16, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 13, color: colors.fg2 }}>Cada rep</Text>
              <Text style={{ fontSize: 13, color: colors.fg2 }}>Solo críticas</Text>
            </View>
            <View style={{ position: 'relative', marginTop: 12, height: 4, backgroundColor: colors.surface2, borderRadius: 99 }}>
              <View style={{ width: '60%', height: '100%', backgroundColor: colors.accent, borderRadius: 99 }} />
              <View
                style={{
                  position: 'absolute', left: '60%', top: -8,
                  width: 20, height: 20, borderRadius: 99,
                  backgroundColor: colors.accent, borderWidth: 3, borderColor: colors.bg,
                  transform: [{ translateX: -10 }],
                }}
              />
            </View>
            <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.accent, marginTop: 12, textAlign: 'center', letterSpacing: 0.8 }]}>
              CADA 3 REPS · INTENSIDAD MEDIA
            </Text>
          </View>
        </View>

        {/* Toggle settings */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, gap: 6 }}>
          {TOGGLES.map((s, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setToggles((prev) => prev.map((v, j) => j === i ? !v : v))}
              style={{
                flexDirection: 'row', alignItems: 'center',
                padding: 12, borderRadius: 12,
                backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
              }}
            >
              <Text style={{ flex: 1, fontSize: 13, color: colors.fg }}>{s.l}</Text>
              <View
                style={{
                  width: 38, height: 22, borderRadius: 99,
                  backgroundColor: toggles[i] ? colors.accent : colors.surface2,
                }}
              >
                <View
                  style={{
                    position: 'absolute', top: 2,
                    left: toggles[i] ? 18 : 2,
                    width: 18, height: 18, borderRadius: 99,
                    backgroundColor: '#fff',
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
