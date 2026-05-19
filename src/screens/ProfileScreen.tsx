import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../hooks/useTheme';
import { FONTS } from '../constants/typography';
import { SCREEN_PADDING } from '../constants/spacing';
import { Palette } from '../types';
import { PALETTES } from '../constants/colors';

const PALETTE_LABELS: Record<Palette, string> = {
  lime: 'LIME', inferno: 'INFERNO', ice: 'ICE', bone: 'BONE',
  volt: 'VOLT', blood: 'BLOOD', royal: 'ROYAL', mint: 'MINT',
  sunset: 'SUNSET', forest: 'FOREST', carbon: 'CARBON', copper: 'COPPER',
};

const GOAL_LABELS: Record<string, string> = {
  muscle: 'Ganar músculo', strength: 'Fuerza pura', fat: 'Quemar grasa',
  calisthenics: 'Calistenia', athletic: 'Rendimiento atlético',
};

export default function ProfileScreen() {
  const theme = useTheme();
  const { user, palette, setPalette, dayMetrics } = useAppStore();

  return (
    <SafeAreaView style={[s.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>TU PERFIL</Text>
        <Text style={[s.title, { color: theme.fg, fontFamily: FONTS.display }]}>{user.name}</Text>

        <View style={s.avatarRow}>
          <View style={[s.avatar, { backgroundColor: theme.surface2, borderColor: theme.line }]}>
            <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
              <Circle cx={12} cy={8} r={4} stroke={theme.accent} strokeWidth={1.5}/>
              <Path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke={theme.accent} strokeWidth={1.5} strokeLinecap="round"/>
            </Svg>
          </View>
          <View style={{ marginLeft: 16 }}>
            <Text style={[s.nameLabel, { color: theme.fg, fontFamily: FONTS.bold }]}>{user.name}</Text>
            <Text style={[s.goalLabel, { color: theme.muted, fontFamily: FONTS.medium }]}>{GOAL_LABELS[user.goal]}</Text>
            <View style={[s.levelBadge, { backgroundColor: `${theme.accent}20` }]}>
              <Text style={[s.levelTxt, { color: theme.accent, fontFamily: FONTS.mono }]}>{user.level.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        <View style={s.statsGrid}>
          {[
            { label: 'RACHA', value: `${dayMetrics.streakDays}d` },
            { label: 'PESO', value: `${user.weight}kg` },
            { label: 'ALTURA', value: `${user.height}cm` },
            { label: 'EDAD', value: `${user.age}a` },
          ].map((stat, i) => (
            <View key={i} style={[s.statCard, { backgroundColor: theme.surface, borderColor: theme.line }]}>
              <Text style={[s.statLabel, { color: theme.muted, fontFamily: FONTS.mono }]}>{stat.label}</Text>
              <Text style={[s.statVal, { color: theme.fg, fontFamily: FONTS.display }]}>{stat.value}</Text>
            </View>
          ))}
        </View>

        <Text style={[s.sectionTitle, { color: theme.fg, fontFamily: FONTS.display }]}>Paleta de color</Text>
        <View style={s.paletteGrid}>
          {(Object.keys(PALETTES) as Palette[]).map((p) => {
            const pal = PALETTES[p];
            const isActive = palette === p;
            return (
              <TouchableOpacity
                key={p}
                style={[s.palCard, { backgroundColor: pal.surface, borderColor: isActive ? pal.accent : pal.line, borderWidth: isActive ? 2 : 1 }]}
                onPress={() => setPalette(p)}
              >
                <View style={[s.accentDot, { backgroundColor: pal.accent }]} />
                <Text style={[s.palLabel, { color: pal.fg, fontFamily: FONTS.mono }]}>{PALETTE_LABELS[p]}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[s.sectionTitle, { color: theme.fg, fontFamily: FONTS.display }]}>Equipamiento</Text>
        <View style={s.equipRow}>
          {user.equipment.map((eq, i) => (
            <View key={i} style={[s.equipChip, { backgroundColor: theme.surface2, borderColor: theme.line }]}>
              <Text style={[s.equipTxt, { color: theme.fg2, fontFamily: FONTS.mono }]}>{eq.toUpperCase()}</Text>
            </View>
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 }, content: { paddingHorizontal: SCREEN_PADDING, paddingTop: 16 },
  eyebrow: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.6, marginBottom: 4 },
  title: { fontSize: 34, lineHeight: 32, letterSpacing: -1, marginBottom: 20 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  avatar: { width: 72, height: 72, borderRadius: 36, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  nameLabel: { fontSize: 20, letterSpacing: -0.5 },
  goalLabel: { fontSize: 14, marginTop: 2, marginBottom: 6 },
  levelBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start' },
  levelTxt: { fontSize: 10, letterSpacing: 0.8 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  statCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 14, borderWidth: 1 },
  statLabel: { fontSize: 9, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 },
  statVal: { fontSize: 28, lineHeight: 30 },
  sectionTitle: { fontSize: 18, lineHeight: 20, letterSpacing: -0.4, marginBottom: 12 },
  paletteGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  palCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  accentDot: { width: 16, height: 16, borderRadius: 8 },
  palLabel: { fontSize: 11, letterSpacing: 0.8 },
  equipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  equipChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99, borderWidth: 1 },
  equipTxt: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.8 },
});
