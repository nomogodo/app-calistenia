import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../hooks/useTheme';
import { FONTS } from '../../constants/typography';
import { SCREEN_PADDING } from '../../constants/spacing';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const ENVS = [
  { id: 'gym', label: 'Gimnasio comercial', desc: 'Máquinas, cables, peso libre' },
  { id: 'park', label: 'Parque de calistenia', desc: 'Barras, paralelas, anillas' },
  { id: 'home', label: 'Casa', desc: 'Material limitado' },
];

const EQUIPMENT = ['Mancuernas', 'Barra olímpica', 'Banda elástica', 'Anillas', 'Kettlebell', 'Lastres', 'TRX', 'Banco'];

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

export default function EquipmentScreen() {
  const theme = useTheme();
  const nav = useNavigation<Nav>();
  const { setUser } = useAppStore();
  const [env, setEnv] = useState('gym');
  const [eq, setEq] = useState<string[]>(['Mancuernas', 'Barra olímpica', 'Banda elástica', 'Anillas']);

  const toggleEq = (e: string) => setEq((p) => p.includes(e) ? p.filter((x) => x !== e) : [...p, e]);

  return (
    <SafeAreaView style={[s.container, { backgroundColor: theme.bg }]}>
      <ProgressBar step={4} total={7} />
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>PASO 4 / 7</Text>
        <Text style={[s.title, { color: theme.fg, fontFamily: FONTS.display }]}>¿Dónde{'
'}vas a entrenar?</Text>

        {ENVS.map((e) => (
          <TouchableOpacity key={e.id} onPress={() => setEnv(e.id)}
            style={[s.envCard, { backgroundColor: env === e.id ? `${theme.accent}1A` : theme.surface, borderColor: env === e.id ? theme.accent : theme.line }]}>
            <View style={{ flex: 1 }}>
              <Text style={[s.envLabel, { color: theme.fg, fontFamily: FONTS.bold }]}>{e.label}</Text>
              <Text style={[s.envDesc, { color: theme.muted, fontFamily: FONTS.mono }]}>{e.desc}</Text>
            </View>
            {env === e.id && <Text style={{ color: theme.accent }}>✓</Text>}
          </TouchableOpacity>
        ))}

        <Text style={[s.sectionLabel, { color: theme.muted, fontFamily: FONTS.mono }]}>MATERIAL EXTRA DISPONIBLE</Text>
        <View style={s.chips}>
          {EQUIPMENT.map((e) => (
            <TouchableOpacity key={e} onPress={() => toggleEq(e)}
              style={[s.chip, { backgroundColor: eq.includes(e) ? theme.accent : theme.surface2, borderColor: eq.includes(e) ? theme.accent : theme.line }]}>
              <Text style={[s.chipTxt, { color: eq.includes(e) ? theme.accentInk : theme.fg2, fontFamily: FONTS.mono }]}>{e}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={[s.cta, { borderTopColor: theme.line, backgroundColor: theme.bg }]}>
        <TouchableOpacity style={[s.back, { borderColor: theme.line2 }]} onPress={() => nav.goBack()}>
          <Text style={[s.backTxt, { color: theme.fg }]}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.primary, { backgroundColor: theme.accent }]} onPress={() => { setUser({ environment: env as any, equipment: eq }); nav.navigate('OnboardingInjuries'); }}>
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
  title: { fontSize: 28, lineHeight: 28, letterSpacing: -1, marginBottom: 20 },
  envCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 14, borderWidth: 1, marginBottom: 8 },
  envLabel: { fontSize: 15 },
  envDesc: { fontSize: 11, marginTop: 2 },
  sectionLabel: { fontSize: 9, letterSpacing: 1.2, textTransform: 'uppercase', marginTop: 24, marginBottom: 10 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 99, borderWidth: 1 },
  chipTxt: { fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 },
  cta: { flexDirection: 'row', gap: 10, paddingHorizontal: SCREEN_PADDING, paddingVertical: 16, paddingBottom: 40, borderTopWidth: 1 },
  back: { width: 56, height: 56, borderRadius: 99, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  backTxt: { fontSize: 20 },
  primary: { flex: 1, height: 56, borderRadius: 99, alignItems: 'center', justifyContent: 'center' },
  primaryTxt: { fontSize: 15, letterSpacing: 0.3 },
});
