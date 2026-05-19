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

const DIETS = [
  { id: 'omnivore', label: 'Omnívoro', desc: 'Todo vale' },
  { id: 'vegetarian', label: 'Vegetariano', desc: 'Sin carne ni pescado' },
  { id: 'vegan', label: 'Vegano', desc: '100% vegetal' },
  { id: 'keto', label: 'Keto', desc: 'Bajo en carbo' },
  { id: 'mediterranean', label: 'Mediterránea', desc: 'Pescado, AOVE' },
  { id: 'intermittent', label: 'Ayuno intermitente', desc: 'Ventana 16/8' },
];

const ALLERGIES = ['Lactosa', 'Gluten', 'Frutos secos', 'Marisco', 'Huevo', 'Soja', 'Pescado'];

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

export default function DietaryScreen() {
  const theme = useTheme();
  const nav = useNavigation<Nav>();
  const { setUser } = useAppStore();
  const [diet, setDiet] = useState('omnivore');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [meals, setMeals] = useState(5);

  const toggleAllergy = (a: string) => setAllergies((p) => p.includes(a) ? p.filter((x) => x !== a) : [...p, a]);

  return (
    <SafeAreaView style={[s.container, { backgroundColor: theme.bg }]}>
      <ProgressBar step={6} total={7} />
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>PASO 6 / 7</Text>
        <Text style={[s.title, { color: theme.fg, fontFamily: FONTS.display }]}>¿Cómo{'
'}comes?</Text>

        <Text style={[s.label, { color: theme.muted, fontFamily: FONTS.mono }]}>DIETA</Text>
        <View style={s.dietGrid}>
          {DIETS.map((d) => (
            <TouchableOpacity key={d.id} onPress={() => setDiet(d.id)}
              style={[s.dietCard, { backgroundColor: diet === d.id ? `${theme.accent}1A` : theme.surface, borderColor: diet === d.id ? theme.accent : theme.line }]}>
              <Text style={[s.dietLabel, { color: theme.fg, fontFamily: FONTS.bold }]}>{d.label}</Text>
              <Text style={[s.dietDesc, { color: theme.muted, fontFamily: FONTS.mono }]}>{d.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[s.label, { color: theme.muted, fontFamily: FONTS.mono }]}>ALERGIAS E INTOLERANCIAS</Text>
        <View style={s.chips}>
          {ALLERGIES.map((a) => (
            <TouchableOpacity key={a} onPress={() => toggleAllergy(a)}
              style={[s.chip, { backgroundColor: allergies.includes(a) ? theme.accent : theme.surface2, borderColor: allergies.includes(a) ? theme.accent : theme.line }]}>
              <Text style={[s.chipTxt, { color: allergies.includes(a) ? theme.accentInk : theme.fg2, fontFamily: FONTS.mono }]}>{a}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[s.label, { color: theme.muted, fontFamily: FONTS.mono }]}>COMIDAS POR DÍA</Text>
        <View style={s.mealsRow}>
          {[3, 4, 5, 6, 7].map((n) => (
            <TouchableOpacity key={n} onPress={() => setMeals(n)}
              style={[s.mealBtn, { backgroundColor: meals === n ? theme.accent : theme.surface, borderColor: meals === n ? theme.accent : theme.line }]}>
              <Text style={[s.mealNum, { color: meals === n ? theme.accentInk : theme.fg, fontFamily: FONTS.mono }]}>{n}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={[s.cta, { borderTopColor: theme.line, backgroundColor: theme.bg }]}>
        <TouchableOpacity style={[s.back, { borderColor: theme.line2 }]} onPress={() => nav.goBack()}>
          <Text style={[s.backTxt, { color: theme.fg }]}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.primary, { backgroundColor: theme.accent }]} onPress={() => { setUser({ dietType: diet as any, allergies, mealsPerDay: meals }); nav.navigate('OnboardingPaywall'); }}>
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
  label: { fontSize: 9, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10, marginTop: 20 },
  dietGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  dietCard: { width: '47%', padding: 12, borderRadius: 12, borderWidth: 1 },
  dietLabel: { fontSize: 13 },
  dietDesc: { fontSize: 10, marginTop: 3 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99, borderWidth: 1 },
  chipTxt: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
  mealsRow: { flexDirection: 'row', gap: 6 },
  mealBtn: { flex: 1, paddingVertical: 14, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  mealNum: { fontSize: 16, fontWeight: '700' },
  cta: { flexDirection: 'row', gap: 10, paddingHorizontal: SCREEN_PADDING, paddingVertical: 16, paddingBottom: 40, borderTopWidth: 1 },
  back: { width: 56, height: 56, borderRadius: 99, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  backTxt: { fontSize: 20 },
  primary: { flex: 1, height: 56, borderRadius: 99, alignItems: 'center', justifyContent: 'center' },
  primaryTxt: { fontSize: 15, letterSpacing: 0.3 },
});
