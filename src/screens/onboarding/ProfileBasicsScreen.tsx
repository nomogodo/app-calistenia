import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../hooks/useTheme';
import { FONTS } from '../../constants/typography';
import { SCREEN_PADDING } from '../../constants/spacing';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';

type Nav = NativeStackNavigationProp<RootStackParamList>;

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

export default function ProfileBasicsScreen() {
  const theme = useTheme();
  const nav = useNavigation<Nav>();
  const { setUser } = useAppStore();
  const [age, setAge] = useState('28');
  const [sex, setSex] = useState(0);
  const [weight, setWeight] = useState('78.4');
  const [height, setHeight] = useState('178');
  const [fat, setFat] = useState('14');

  const onContinue = () => {
    setUser({ age: +age, sex: (['male', 'female', 'other'] as const)[sex], weight: +weight, height: +height, bodyFatPct: +fat });
    nav.navigate('OnboardingFitness');
  };

  return (
    <SafeAreaView style={[s.container, { backgroundColor: theme.bg }]}>
      <ProgressBar step={2} total={7} />
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>PASO 2 / 7</Text>
        <Text style={[s.title, { color: theme.fg, fontFamily: FONTS.display }]}>Dime quién eres.</Text>
        <Text style={[s.sub, { color: theme.fg2, fontFamily: FONTS.medium }]}>Datos básicos para calcular tu metabolismo basal. Sin esto, vamos a ciegas.</Text>

        <Text style={[s.label, { color: theme.muted, fontFamily: FONTS.mono }]}>EDAD</Text>
        <View style={[s.field, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <TextInput style={[s.fieldInput, { color: theme.fg, fontFamily: FONTS.display }]} value={age} onChangeText={setAge} keyboardType="number-pad" />
          <Text style={[s.unit, { color: theme.muted, fontFamily: FONTS.mono }]}>años</Text>
        </View>

        <Text style={[s.label, { color: theme.muted, fontFamily: FONTS.mono }]}>SEXO</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {['Hombre', 'Mujer', 'Otro'].map((p, i) => (
            <TouchableOpacity key={p} onPress={() => setSex(i)}
              style={[s.pill, { backgroundColor: sex === i ? theme.accent : theme.surface2, borderColor: sex === i ? theme.accent : theme.line }]}>
              <Text style={[s.pillTxt, { color: sex === i ? theme.accentInk : theme.fg2, fontFamily: FONTS.mono }]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[s.label, { color: theme.muted, fontFamily: FONTS.mono }]}>PESO</Text>
        <View style={[s.field, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <TextInput style={[s.fieldInput, { color: theme.fg, fontFamily: FONTS.display }]} value={weight} onChangeText={setWeight} keyboardType="decimal-pad" />
          <Text style={[s.unit, { color: theme.muted, fontFamily: FONTS.mono }]}>kg</Text>
        </View>

        <Text style={[s.label, { color: theme.muted, fontFamily: FONTS.mono }]}>ALTURA</Text>
        <View style={[s.field, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <TextInput style={[s.fieldInput, { color: theme.fg, fontFamily: FONTS.display }]} value={height} onChangeText={setHeight} keyboardType="number-pad" />
          <Text style={[s.unit, { color: theme.muted, fontFamily: FONTS.mono }]}>cm</Text>
        </View>

        <Text style={[s.label, { color: theme.muted, fontFamily: FONTS.mono }]}>GRASA CORPORAL</Text>
        <View style={[s.field, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <TextInput style={[s.fieldInput, { color: theme.fg, fontFamily: FONTS.display }]} value={fat} onChangeText={setFat} keyboardType="decimal-pad" />
          <Text style={[s.unit, { color: theme.muted, fontFamily: FONTS.mono }]}>%</Text>
        </View>
        <Text style={[s.hint, { color: theme.dim, fontFamily: FONTS.mono }]}>Estimación · puedes ajustarlo luego</Text>
      </ScrollView>

      <View style={[s.cta, { borderTopColor: theme.line, backgroundColor: theme.bg }]}>
        <TouchableOpacity style={[s.back, { borderColor: theme.line2 }]} onPress={() => nav.goBack()}>
          <Text style={[s.backTxt, { color: theme.fg }]}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.primary, { backgroundColor: theme.accent }]} onPress={onContinue}>
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
  title: { fontSize: 30, lineHeight: 30, letterSpacing: -1, marginBottom: 8 },
  sub: { fontSize: 14, lineHeight: 20, marginBottom: 24 },
  label: { fontSize: 9, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8, marginTop: 16 },
  field: { borderRadius: 12, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  fieldInput: { flex: 1, fontSize: 22 },
  unit: { fontSize: 12 },
  pill: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 99, borderWidth: 1 },
  pillTxt: { fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 },
  hint: { fontSize: 10, marginTop: 6, letterSpacing: 0.5 },
  cta: { flexDirection: 'row', gap: 10, paddingHorizontal: SCREEN_PADDING, paddingVertical: 16, paddingBottom: 40, borderTopWidth: 1 },
  back: { width: 56, height: 56, borderRadius: 99, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  backTxt: { fontSize: 20 },
  primary: { flex: 1, height: 56, borderRadius: 99, alignItems: 'center', justifyContent: 'center' },
  primaryTxt: { fontSize: 15, letterSpacing: 0.3 },
});
