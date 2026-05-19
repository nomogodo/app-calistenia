import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../hooks/useTheme';
import { FONTS } from '../../constants/typography';
import { SCREEN_PADDING } from '../../constants/spacing';
import { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const TESTS = [
  { c: 'GIM', t: 'Press banca · 1RM', def: '80', u: 'kg' },
  { c: 'GIM', t: 'Sentadilla · 1RM', def: '110', u: 'kg' },
  { c: 'GIM', t: 'Peso muerto · 1RM', def: '130', u: 'kg' },
  { c: 'CAL', t: 'Dominadas estrictas', def: '12', u: 'reps' },
  { c: 'CAL', t: 'Fondos en paralelas', def: '20', u: 'reps' },
  { c: 'CAL', t: 'Flexiones consecutivas', def: '45', u: 'reps' },
  { c: 'CAL', t: 'Plancha frontal', def: '90', u: 'seg' },
  { c: 'CAL', t: 'L-sit aguante', def: '12', u: 'seg' },
];

function ProgressBar({ step, total }: { step: number; total: number }) {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 4, paddingHorizontal: SCREEN_PADDING, paddingTop: 20 }}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={{ flex: 1, height: 3, borderRadius: 99, backgroundColor: i < step ? theme.accent : theme.surface2 }} />
      ))}
    </View>
  );
}

export default function FitnessTestScreen() {
  const theme = useTheme();
  const nav = useNavigation<Nav>();
  const [vals, setVals] = useState(TESTS.map((t) => t.def));

  return (
    <SafeAreaView style={[s.container, { backgroundColor: theme.bg }]}>
      <ProgressBar step={3} total={7} />
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>PASO 3 / 7 · TEST DE NIVEL</Text>
        <Text style={[s.title, { color: theme.fg, fontFamily: FONTS.display }]}>¿Qué eres capaz{'
'}de hacer hoy?</Text>
        <Text style={[s.sub, { color: theme.fg2, fontFamily: FONTS.medium }]}>Sé honesto. Voy a calibrar tu volumen e intensidad inicial.</Text>

        {TESTS.map((q, i) => (
          <View key={i} style={[s.row, { backgroundColor: theme.surface, borderColor: theme.line }]}>
            <View style={[s.badge, { backgroundColor: q.c === 'GIM' ? `${theme.accent}28` : theme.surface2 }]}>
              <Text style={[s.badgeTxt, { color: q.c === 'GIM' ? theme.accent : theme.fg2, fontFamily: FONTS.mono }]}>{q.c}</Text>
            </View>
            <Text style={[s.qTxt, { color: theme.fg2, fontFamily: FONTS.medium }]}>{q.t}</Text>
            <TextInput
              style={[s.numInput, { backgroundColor: theme.bg2, borderColor: theme.line2, color: theme.fg, fontFamily: FONTS.mono }]}
              value={vals[i]}
              onChangeText={(v) => setVals((p) => { const n = [...p]; n[i] = v; return n; })}
              keyboardType="number-pad"
            />
            <Text style={[s.unitTxt, { color: theme.muted, fontFamily: FONTS.mono }]}>{q.u}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={[s.cta, { borderTopColor: theme.line, backgroundColor: theme.bg }]}>
        <TouchableOpacity style={[s.back, { borderColor: theme.line2 }]} onPress={() => nav.goBack()}>
          <Text style={[s.backTxt, { color: theme.fg }]}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.primary, { backgroundColor: theme.accent }]} onPress={() => nav.navigate('OnboardingEquipment')}>
          <Text style={[s.primaryTxt, { color: theme.accentInk, fontFamily: FONTS.bold }]}>CONTINUAR ›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: SCREEN_PADDING, paddingTop: 12, paddingBottom: 20 },
  eyebrow: { fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', marginBottom: 6 },
  title: { fontSize: 28, lineHeight: 28, letterSpacing: -1, marginBottom: 8 },
  sub: { fontSize: 13, lineHeight: 19, marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12, borderWidth: 1, marginBottom: 8 },
  badge: { paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4 },
  badgeTxt: { fontSize: 9, fontWeight: '700', letterSpacing: 0.8 },
  qTxt: { flex: 1, fontSize: 13 },
  numInput: { width: 56, height: 36, borderRadius: 8, borderWidth: 1, textAlign: 'center', fontSize: 14 },
  unitTxt: { fontSize: 10, width: 28 },
  cta: { flexDirection: 'row', gap: 10, paddingHorizontal: SCREEN_PADDING, paddingVertical: 16, paddingBottom: 40, borderTopWidth: 1 },
  back: { width: 56, height: 56, borderRadius: 99, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  backTxt: { fontSize: 20 },
  primary: { flex: 1, height: 56, borderRadius: 99, alignItems: 'center', justifyContent: 'center' },
  primaryTxt: { fontSize: 15, letterSpacing: 0.3 },
});
