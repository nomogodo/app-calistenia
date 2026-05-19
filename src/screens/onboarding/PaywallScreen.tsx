import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../hooks/useTheme';
import { FONTS } from '../../constants/typography';
import { SCREEN_PADDING } from '../../constants/spacing';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const FEATURES = [
  { icon: '✨', label: 'Coach IA 24/7', desc: 'Conversación ilimitada' },
  { icon: '🎥', label: 'Corrección de técnica', desc: 'Visión por computadora' },
  { icon: '▶️', label: 'Videos low-poly generados', desc: '842 ejercicios animados' },
  { icon: '🔥', label: 'Plan adaptativo', desc: 'Se ajusta cada semana' },
];

const PLANS = [
  { id: 'annual', label: 'Anual', price: '8,33 €/mes', detail: '99,99 € · ahorra 50%', best: true },
  { id: 'monthly', label: 'Mensual', price: '16,99 €/mes', detail: 'Cancela cuando quieras' },
];

export default function PaywallScreen() {
  const theme = useTheme();
  const nav = useNavigation<Nav>();
  const { completeOnboarding } = useAppStore();
  const [plan, setPlan] = useState('annual');

  return (
    <SafeAreaView style={[s.container, { backgroundColor: theme.bg }]}>
      <View style={[s.halo, { backgroundColor: `${theme.accent}28` }]} />
      <View style={s.top}>
        <TouchableOpacity style={[s.closeBtn, { backgroundColor: theme.surface, borderColor: theme.line }]} onPress={() => nav.goBack()}>
          <Text style={{ color: theme.muted }}>✕</Text>
        </TouchableOpacity>
        <View style={[s.proBadge, { backgroundColor: theme.accent }]}>
          <Text style={[s.proBadgeTxt, { color: theme.accentInk, fontFamily: FONTS.mono }]}>★ FORGE PRO</Text>
        </View>
        <Text style={[s.headline, { color: theme.fg, fontFamily: FONTS.display }]}>
          Tu plan está listo.{'
'}<Text style={{ color: theme.accent }}>Desbloquéalo.</Text>
        </Text>
      </View>

      <View style={s.features}>
        {FEATURES.map((f) => (
          <View key={f.label} style={s.featureRow}>
            <View style={[s.featureIcon, { backgroundColor: theme.surface2 }]}>
              <Text style={{ fontSize: 18 }}>{f.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[s.featureLabel, { color: theme.fg, fontFamily: FONTS.bold }]}>{f.label}</Text>
              <Text style={[s.featureDesc, { color: theme.muted, fontFamily: FONTS.mono }]}>{f.desc}</Text>
            </View>
            <Text style={{ color: theme.accent }}>✓</Text>
          </View>
        ))}
      </View>

      <View style={s.plans}>
        {PLANS.map((p) => (
          <TouchableOpacity key={p.id} onPress={() => setPlan(p.id)}
            style={[s.planCard, { backgroundColor: plan === p.id ? `${theme.accent}1A` : theme.surface, borderColor: plan === p.id ? theme.accent : theme.line }]}>
            <View style={[s.radio, { borderColor: plan === p.id ? theme.accent : theme.line2 }]}>
              {plan === p.id && <View style={[s.radioDot, { backgroundColor: theme.accent }]} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[s.planLabel, { color: theme.fg, fontFamily: FONTS.bold }]}>{p.label}</Text>
              <Text style={[s.planDetail, { color: theme.muted, fontFamily: FONTS.mono }]}>{p.detail}</Text>
            </View>
            <Text style={[s.planPrice, { color: theme.fg, fontFamily: FONTS.display }]}>{p.price}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={s.bottom}>
        <TouchableOpacity style={[s.ctaBtn, { backgroundColor: theme.accent }]} onPress={completeOnboarding}>
          <Text style={[s.ctaTxt, { color: theme.accentInk, fontFamily: FONTS.bold }]}>EMPEZAR 7 DÍAS GRATIS</Text>
        </TouchableOpacity>
        <Text style={[s.fine, { color: theme.muted, fontFamily: FONTS.mono }]}>Sin compromiso. Cancela en cualquier momento.</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: SCREEN_PADDING },
  halo: { position: 'absolute', top: 0, left: 0, right: 0, height: 280, borderBottomLeftRadius: 999, borderBottomRightRadius: 999 },
  top: { paddingTop: 20, gap: 16, zIndex: 1 },
  closeBtn: { width: 32, height: 32, borderRadius: 99, borderWidth: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' },
  proBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 99, alignSelf: 'flex-start' },
  proBadgeTxt: { fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
  headline: { fontSize: 38, lineHeight: 36, letterSpacing: -1 },
  features: { marginTop: 24, gap: 10 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  featureLabel: { fontSize: 14 },
  featureDesc: { fontSize: 11, marginTop: 1 },
  plans: { marginTop: 24, gap: 8 },
  planCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 14, borderWidth: 1.5 },
  radio: { width: 22, height: 22, borderRadius: 99, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 10, height: 10, borderRadius: 99 },
  planLabel: { fontSize: 14 },
  planDetail: { fontSize: 10, marginTop: 2 },
  planPrice: { fontSize: 18 },
  bottom: { flex: 1, justifyContent: 'flex-end', paddingBottom: 40, gap: 10 },
  ctaBtn: { height: 56, borderRadius: 99, alignItems: 'center', justifyContent: 'center' },
  ctaTxt: { fontSize: 15, letterSpacing: 0.3 },
  fine: { fontSize: 10, textAlign: 'center', letterSpacing: 0.5 },
});
