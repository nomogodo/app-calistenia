import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Svg, Path } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../hooks/useTheme';
import { RootStackParamList } from '../navigation/types';
import { FONTS } from '../constants/typography';
import { SCREEN_PADDING } from '../constants/spacing';
import { Goal } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const GOALS: { id: Goal; title: string; subtitle: string }[] = [
  { id: 'muscle', title: 'Ganar músculo', subtitle: 'Hipertrofia · Volumen progresivo' },
  { id: 'strength', title: 'Levantar más peso', subtitle: 'Fuerza pura · 1RM' },
  { id: 'fat', title: 'Quemar grasa', subtitle: 'Recomposición · Déficit guiado' },
  { id: 'calisthenics', title: 'Dominar tu cuerpo', subtitle: 'Calistenia · Skills + control' },
  { id: 'athletic', title: 'Rendimiento atlético', subtitle: 'Potencia · Movilidad · Cardio' },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<Nav>();
  const theme = useTheme();
  const [selected, setSelected] = useState<Goal>('muscle');
  const { setUser, completeOnboarding } = useAppStore();

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setUser({ goal: selected });
    completeOnboarding();
  };

  return (
    <SafeAreaView style={[s.container, { backgroundColor: theme.bg }]}>
      <View style={[s.halo, { backgroundColor: theme.accent }]} pointerEvents="none" />
      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {/* Progress */}
        <View style={s.progressRow}>
          <View style={s.bars}>
            {[0, 1, 2, 3, 4].map((i) => (
              <View key={i} style={[s.seg, { backgroundColor: i < 3 ? theme.accent : theme.surface2 }]} />
            ))}
          </View>
          <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>PASO 3 / 5</Text>
        </View>

        {/* Coach badge */}
        <View style={s.badgeWrap}>
          <View style={[s.badge, { backgroundColor: theme.surface2, borderColor: theme.line2 }]}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path d="M12 2l2.4 7.4H22l-6.4 4.6 2.4 7.4L12 17l-6 4.4 2.4-7.4L2 9.4h7.6L12 2z" stroke={theme.accent} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
            <View style={[s.online, { backgroundColor: theme.accent, borderColor: theme.bg }]} />
          </View>
          <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono, marginTop: 8 }]}>
            FORGE · TU COACH
          </Text>
        </View>

        {/* Heading */}
        <View style={s.headBlock}>
          <Text style={[s.h1, { color: theme.fg, fontFamily: FONTS.display }]}>Suficiente de excusas.</Text>
          <Text style={[s.h1, { color: theme.accent, fontFamily: FONTS.display }]}>¿Qué venimos a romper hoy?</Text>
          <Text style={[s.sub, { color: theme.fg2, fontFamily: FONTS.medium }]}>
            Elige tu objetivo principal. Voy a construirte un plan de 12 semanas. Sin atajos.
          </Text>
        </View>

        {/* Goal options */}
        <View style={s.list}>
          {GOALS.map((g) => {
            const isActive = selected === g.id;
            return (
              <TouchableOpacity
                key={g.id}
                style={[
                  s.option,
                  {
                    backgroundColor: isActive ? `${theme.accent}1E` : theme.surface,
                    borderColor: isActive ? theme.accent : theme.line,
                  },
                ]}
                onPress={() => { Haptics.selectionAsync(); setSelected(g.id); }}
                activeOpacity={0.8}
              >
                <View style={s.optionLeft}>
                  <Text style={[s.optTitle, { color: theme.fg, fontFamily: FONTS.semiBold }]}>{g.title}</Text>
                  <Text style={[s.optSub, { color: theme.muted, fontFamily: FONTS.mono }]}>{g.subtitle}</Text>
                </View>
                <View style={[s.radio, { borderColor: isActive ? theme.accent : theme.line2 }]}>
                  {isActive && <View style={[s.radioDot, { backgroundColor: theme.accent }]} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* CTA */}
      <View style={[s.cta, { backgroundColor: theme.bg }]}>
        <TouchableOpacity style={[s.backBtn, { borderColor: theme.line2 }]} activeOpacity={0.7}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path d="M15 18l-6-6 6-6" stroke={theme.fg} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity style={[s.continueBtn, { backgroundColor: theme.accent }]} onPress={handleContinue} activeOpacity={0.85}>
          <Text style={[s.continueTxt, { color: theme.accentInk, fontFamily: FONTS.bold }]}>CONTINUAR</Text>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path d="M9 18l6-6-6-6" stroke={theme.accentInk} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  halo: { position: 'absolute', top: -160, left: '50%', marginLeft: -180, width: 360, height: 360, borderRadius: 180, opacity: 0.1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: SCREEN_PADDING, paddingTop: 20 },
  progressRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 },
  bars: { flexDirection: 'row', gap: 6 },
  seg: { width: 22, height: 3, borderRadius: 99 },
  eyebrow: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.6 },
  badgeWrap: { alignItems: 'center', marginBottom: 32 },
  badge: { width: 56, height: 56, borderRadius: 28, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  online: { position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: 7, borderWidth: 3 },
  headBlock: { marginBottom: 28 },
  h1: { fontSize: 38, lineHeight: 36, letterSpacing: -1.1 },
  sub: { fontSize: 15, lineHeight: 22, marginTop: 12 },
  list: { gap: 10 },
  option: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 16, borderRadius: 16, borderWidth: 1 },
  optionLeft: { flex: 1 },
  optTitle: { fontSize: 16, marginBottom: 3 },
  optSub: { fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
  cta: { flexDirection: 'row', gap: 10, paddingHorizontal: SCREEN_PADDING, paddingVertical: 16, paddingBottom: 36 },
  backBtn: { width: 56, height: 56, borderRadius: 28, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  continueBtn: { flex: 1, height: 56, borderRadius: 99, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  continueTxt: { fontSize: 15, letterSpacing: 0.3 },
});
