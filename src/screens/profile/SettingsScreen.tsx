import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/useAppStore';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import type { Palette } from '../../types';

const PALETTES: Palette[] = ['lime', 'inferno', 'ice', 'bone', 'volt', 'blood', 'royal', 'mint', 'sunset', 'forest', 'carbon', 'copper'];

type Toggle = { l: string; on: boolean };
type Row = { icon?: string; t: string; s?: string; right?: React.ReactNode; danger?: boolean };

const Toggle = ({ on, onPress }: { on: boolean; onPress: () => void }) => {
  const colors = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: 38, height: 22, borderRadius: 99, backgroundColor: on ? colors.accent : colors.surface2 }}
    >
      <View
        style={{
          position: 'absolute', top: 2,
          left: on ? 18 : 2,
          width: 18, height: 18, borderRadius: 99, backgroundColor: '#fff',
        }}
      />
    </TouchableOpacity>
  );
};

export function SettingsScreen({ navigation }: any) {
  const colors = useTheme();
  const { palette, setPalette, user } = useAppStore();

  const [notifs, setNotifs] = useState([true, true, false, true, true]);
  const [privacy, setPrivacy] = useState([false, true]);

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
      <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 8, color: colors.muted }]}>{title}</Text>
      <View style={{ backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 14, overflow: 'hidden' }}>
        {children}
      </View>
    </View>
  );

  const Row = ({ icon, t, s, right, danger, first }: any) => (
    <View
      style={{
        flexDirection: 'row', alignItems: 'center', gap: 12,
        padding: 13,
        borderTopWidth: first ? 0 : 1, borderTopColor: colors.line,
      }}
    >
      {icon && (
        <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: colors.surface2, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16 }}>{icon}</Text>
        </View>
      )}
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={{ fontSize: 13, fontWeight: '500', color: danger ? '#FF8080' : colors.fg }}>{t}</Text>
        {s && <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted, marginTop: 2 }]}>{s}</Text>}
      </View>
      {right}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
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
            <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>CONFIGURACIÓN</Text>
            <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2, color: colors.fg }}>Ajustes</Text>
          </View>
        </View>

        {/* Subscription */}
        <View
          style={{
            marginTop: SPACING.md, marginHorizontal: SPACING.md, padding: 16,
            borderRadius: 16, backgroundColor: `${colors.accent}1E`, borderWidth: 1, borderColor: colors.accent,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, backgroundColor: colors.accent }}>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: colors.accentInk, fontWeight: '700', letterSpacing: 1 }]}>★ PRO</Text>
            </View>
            <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.fg2 }]}>RENUEVA EL 14 FEB 2027</Text>
          </View>
          <Text style={{ marginTop: 12, fontSize: 14, fontWeight: '700', color: colors.fg }}>Forge Pro · Anual</Text>
          <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.muted, marginTop: 4 }]}>99,99 €/año · gestiona desde Apple ID</Text>
        </View>

        {/* Palette picker */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>PALETA DE COLOR</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, flexDirection: 'row' }}>
            {PALETTES.map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setPalette(p)}
                style={{
                  paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99,
                  backgroundColor: palette === p ? colors.accent : colors.surface,
                  borderWidth: 1, borderColor: palette === p ? colors.accent : colors.line,
                }}
              >
                <Text style={[TYPOGRAPHY.mono, {
                  fontSize: 10, fontWeight: '700', letterSpacing: 1,
                  color: palette === p ? colors.accentInk : colors.fg,
                }]}>{p.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Section title="NOTIFICACIONES">
          {[
            { t: 'Recordatorio de entreno', s: '30 min antes', i: 0 },
            { t: 'Recordatorio de comidas', i: 1 },
            { t: 'Recordatorio de hidratación', i: 2 },
            { t: 'Resumen semanal IA', s: 'Domingos · 20:00', i: 3 },
            { t: 'Mensajes del coach', i: 4 },
          ].map((item, i) => (
            <Row
              key={i}
              first={i === 0}
              t={item.t}
              s={item.s}
              right={
                <Toggle
                  on={notifs[item.i]}
                  onPress={() => setNotifs((prev) => prev.map((v, j) => j === item.i ? !v : v))}
                />
              }
            />
          ))}
        </Section>

        <Section title="CUENTA">
          {[
            { t: 'Editar perfil' },
            { t: 'Cambiar objetivo', s: 'Hipertrofia' },
            { t: 'Idioma', s: 'Español' },
            { t: 'Unidades', s: 'Métrico (kg, cm)' },
          ].map((item, i) => (
            <Row key={i} first={i === 0} t={item.t} s={item.s} right={<Text style={{ color: colors.dim, fontSize: 16 }}>›</Text>} />
          ))}
        </Section>

        <Section title="PRIVACIDAD">
          <Row first t="Datos de salud" right={<Text style={{ color: colors.dim, fontSize: 16 }}>›</Text>} />
          <Row t="Compartir progreso" right={<Toggle on={privacy[0]} onPress={() => setPrivacy((p) => [!p[0], p[1]])} />} />
          <Row t="Análisis y telemetría" right={<Toggle on={privacy[1]} onPress={() => setPrivacy((p) => [p[0], !p[1]])} />} />
          <Row t="Eliminar mi cuenta" danger right={<Text style={{ color: colors.dim, fontSize: 16 }}>›</Text>} />
        </Section>

        <View style={{ paddingTop: SPACING.md, alignItems: 'center' }}>
          <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.dim, letterSpacing: 1 }]}>FORGE V 1.0.0 · BUILD 2026.0519</Text>
        </View>
      </ScrollView>
    </View>
  );
}
