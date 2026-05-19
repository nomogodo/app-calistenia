import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Svg, Circle, Path, Line } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';
import { FONTS } from '../../constants/typography';
import { SCREEN_PADDING } from '../../constants/spacing';
import { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const CONDITIONS = ['Hernia discal / lumbar', 'Tendinitis activa', 'Operación reciente (<6m)', 'Hipertensión', 'Ninguna de las anteriores'];

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

export default function InjuriesScreen() {
  const theme = useTheme();
  const nav = useNavigation<Nav>();
  const [conditions, setConditions] = useState<number[]>([4]);

  const toggleCondition = (i: number) => setConditions((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);

  return (
    <SafeAreaView style={[s.container, { backgroundColor: theme.bg }]}>
      <ProgressBar step={5} total={7} />
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>PASO 5 / 7</Text>
        <Text style={[s.title, { color: theme.fg, fontFamily: FONTS.display }]}>Lesiones{'
'}o molestias?</Text>
        <Text style={[s.sub, { color: theme.fg2, fontFamily: FONTS.medium }]}>Marca las zonas con dolor. Adaptaré los ejercicios para que no te jodas.</Text>

        <View style={s.bodyRow}>
          <Svg viewBox="0 0 130 280" width={120} height={260}>
            <Circle cx={65} cy={28} r={18} stroke="rgba(255,255,255,0.18)" strokeWidth={1.2} fill="rgba(255,255,255,0.03)" />
            <Path d="M40 48 Q65 44 90 48 L95 100 L35 100 Z" stroke="rgba(255,255,255,0.18)" strokeWidth={1.2} fill="rgba(255,255,255,0.03)" />
            <Path d="M35 105 Q65 108 95 105 L92 145 L38 145 Z" stroke="rgba(255,255,255,0.18)" strokeWidth={1.2} fill="rgba(255,255,255,0.03)" />
            <Path d="M40 105 L20 105 L10 200 L20 210" stroke="rgba(255,255,255,0.18)" strokeWidth={1.2} fill="none" />
            <Path d="M90 105 L110 105 L120 200 L110 210" stroke="rgba(255,255,255,0.18)" strokeWidth={1.2} fill="none" />
            <Path d="M48 150 L42 230 L48 270 L60 270 L62 200 L58 150 Z" stroke="rgba(255,255,255,0.18)" strokeWidth={1.2} fill="rgba(255,255,255,0.03)" />
            <Path d="M82 150 L88 230 L82 270 L70 270 L68 200 L72 150 Z" stroke="rgba(255,255,255,0.18)" strokeWidth={1.2} fill="rgba(255,255,255,0.03)" />
            <Circle cx={42} cy={100} r={9} fill="#FF6B6B" opacity={0.9} />
            <Circle cx={42} cy={100} r={14} fill="none" stroke="#FF6B6B" strokeWidth={1.5} opacity={0.5} />
            <Circle cx={55} cy={200} r={7} fill="#FFB070" opacity={0.7} />
          </Svg>

          <View style={{ flex: 1, gap: 8 }}>
            {[
              { z: 'Hombro derecho', g: 'Dolor leve al rotar', c: '#FF6B6B' },
              { z: 'Rodilla izquierda', g: 'Molestia ocasional', c: '#FFB070' },
            ].map((inj, i) => (
              <View key={i} style={[s.injCard, { backgroundColor: theme.surface, borderColor: theme.line }]}>
                <View style={[s.injDot, { backgroundColor: inj.c }]} />
                <View>
                  <Text style={[s.injName, { color: theme.fg, fontFamily: FONTS.semiBold }]}>{inj.z}</Text>
                  <Text style={[s.injGrade, { color: theme.muted, fontFamily: FONTS.mono }]}>{inj.g}</Text>
                </View>
              </View>
            ))}
            <TouchableOpacity style={[s.addZone, { borderColor: theme.line2 }]}>
              <Text style={[s.addZoneTxt, { color: theme.fg2, fontFamily: FONTS.medium }]}>+ Añadir zona</Text>
            </TouchableOpacity>
          </View>
        </View>

        {CONDITIONS.map((c, i) => (
          <TouchableOpacity key={c} onPress={() => toggleCondition(i)}
            style={[s.condRow, { backgroundColor: theme.surface, borderColor: theme.line }]}>
            <View style={[s.check, { backgroundColor: conditions.includes(i) ? theme.accent : 'transparent', borderColor: conditions.includes(i) ? theme.accent : theme.line2 }]}>
              {conditions.includes(i) && <Text style={{ color: theme.accentInk, fontSize: 10 }}>✓</Text>}
            </View>
            <Text style={[s.condTxt, { color: theme.fg2, fontFamily: FONTS.medium }]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={[s.cta, { borderTopColor: theme.line, backgroundColor: theme.bg }]}>
        <TouchableOpacity style={[s.back, { borderColor: theme.line2 }]} onPress={() => nav.goBack()}>
          <Text style={[s.backTxt, { color: theme.fg }]}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.primary, { backgroundColor: theme.accent }]} onPress={() => nav.navigate('OnboardingDietary')}>
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
  bodyRow: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  injCard: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 10, borderWidth: 1 },
  injDot: { width: 6, height: 6, borderRadius: 3 },
  injName: { fontSize: 12 },
  injGrade: { fontSize: 10, marginTop: 2 },
  addZone: { padding: 10, borderRadius: 10, borderWidth: 1, borderStyle: 'dashed', alignItems: 'center' },
  addZoneTxt: { fontSize: 12 },
  condRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 6 },
  check: { width: 18, height: 18, borderRadius: 5, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  condTxt: { fontSize: 13 },
  cta: { flexDirection: 'row', gap: 10, paddingHorizontal: SCREEN_PADDING, paddingVertical: 16, paddingBottom: 40, borderTopWidth: 1 },
  back: { width: 56, height: 56, borderRadius: 99, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  backTxt: { fontSize: 20 },
  primary: { flex: 1, height: 56, borderRadius: 99, alignItems: 'center', justifyContent: 'center' },
  primaryTxt: { fontSize: 15, letterSpacing: 0.3 },
});
