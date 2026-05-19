import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { FONTS } from '../constants/typography';
import { SCREEN_PADDING } from '../constants/spacing';
import { EXERCISES } from '../constants/exercises';
import { RootStackParamList } from '../navigation/types';
import { Exercise } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const CATEGORIES = ['Todos', 'Pecho', 'Espalda', 'Pierna', 'Hombro', 'Brazo', 'Core', 'Calistenia'];

const DIFF_CHIP: Record<string, { bg: string; color: string; label: string }> = {
  beginner: { bg: 'rgba(74,222,128,0.12)', color: '#4ADE80', label: 'Prin.' },
  intermediate: { bg: 'rgba(255,255,255,0.08)', color: 'rgba(245,245,242,0.72)', label: 'Inter.' },
  advanced: { bg: 'rgba(255,170,80,0.12)', color: '#FFB070', label: 'Avzd.' },
  elite: { bg: 'rgba(255,80,80,0.15)', color: '#FF8080', label: 'Élite' },
};

function ExThumb({ color }: { color: string }) {
  return (
    <View style={[th.thumb, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }]}>
      <Svg width={28} height={28} viewBox="0 0 32 32" fill="none">
        <Path d="M16 6C13 6 11 9 11 12s2 4 5 4 5-1 5-4-2-6-5-6z" stroke={color} strokeWidth={1.2} strokeOpacity={0.5}/>
        <Path d="M8 26c0-4 3.6-7 8-7s8 3 8 7" stroke={color} strokeWidth={1.2} strokeOpacity={0.5}/>
      </Svg>
    </View>
  );
}
const th = StyleSheet.create({
  thumb: { width: 56, height: 56, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
});

function RecommendedCard({ exercise, onPress, theme }: { exercise: Exercise; onPress: () => void; theme: any }) {
  return (
    <TouchableOpacity style={[rc.card, { backgroundColor: theme.surface, borderColor: theme.line }]} onPress={onPress} activeOpacity={0.85}>
      <View style={[rc.preview, { backgroundColor: theme.surface2 }]}>
        <Svg width="100%" height="140" viewBox="0 0 180 140" fill="none">
          {Array.from({ length: 6 }).map((_, i) => (
            <Path key={i} d={`M${i*36} 0 L${i*36} 140`} stroke="rgba(255,255,255,0.04)" strokeWidth={1}/>
          ))}
          <Path d="M90 30 L90 80 M75 50 L105 50 M75 80 L85 110 M105 80 L95 110" stroke={theme.accent} strokeWidth={1.5} strokeOpacity={0.7} strokeLinecap="round"/>
          <Path d="M82 22 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0" stroke={theme.accent} strokeWidth={1.5} strokeOpacity={0.7} fill="none"/>
        </Svg>
        <View style={[rc.iaBadge, { backgroundColor: theme.accent }]}>
          <Text style={[rc.iaTxt, { color: theme.accentInk, fontFamily: FONTS.mono }]}>IA</Text>
        </View>
        <View style={[rc.durBadge, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
          <Text style={[rc.durTxt, { color: theme.fg, fontFamily: FONTS.mono }]}>▶ {exercise.videoDuration}</Text>
        </View>
      </View>
      <Text style={[rc.name, { color: theme.fg, fontFamily: FONTS.semiBold }]}>{exercise.name}</Text>
      <Text style={[rc.meta, { color: theme.muted, fontFamily: FONTS.mono }]}>
        {exercise.category.toUpperCase()} · {exercise.equipment.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}
const rc = StyleSheet.create({
  card: { width: 180, borderRadius: 16, borderWidth: 1, overflow: 'hidden', marginRight: 12 },
  preview: { height: 140, alignItems: 'center', justifyContent: 'center' },
  iaBadge: { position: 'absolute', top: 8, right: 8, paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6 },
  iaTxt: { fontSize: 9, letterSpacing: 0.5 },
  durBadge: { position: 'absolute', top: 8, left: 8, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 99 },
  durTxt: { fontSize: 10 },
  name: { fontSize: 13, padding: 10, paddingBottom: 2 },
  meta: { fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.8, paddingHorizontal: 10, paddingBottom: 10 },
});

export default function LibraryScreen() {
  const navigation = useNavigation<Nav>();
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [filters, setFilters] = useState(['Equipo: Barra', 'Dificultad: Intermedio', 'Tipo: Compuesto']);

  const filtered = useMemo(() => EXERCISES.filter((ex) => {
    const matchSearch = !search ||
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.category.toLowerCase().includes(search.toLowerCase()) ||
      ex.equipment.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'Todos' || ex.category === activeCategory;
    return matchSearch && matchCat;
  }), [search, activeCategory]);

  return (
    <SafeAreaView style={[s.container, { backgroundColor: theme.bg }]}>
      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>BIBLIOTECA</Text>
        <Text style={[s.title, { color: theme.fg, fontFamily: FONTS.display }]}>
          842 ejercicios.{'\n'}<Text style={{ color: theme.accent }}>Cero excusas.</Text>
        </Text>

        <View style={s.searchRow}>
          <View style={[s.searchWrap, { backgroundColor: theme.surface, borderColor: theme.line }]}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke={theme.muted} strokeWidth={1.6} strokeLinecap="round"/>
            </Svg>
            <TextInput
              style={[s.searchInput, { color: theme.fg, fontFamily: FONTS.medium }]}
              placeholder="Buscar ejercicio, músculo o equipo…"
              placeholderTextColor={theme.muted}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={[s.filterBtn, { backgroundColor: theme.surface, borderColor: theme.line }]}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path d="M3 6h18M6 12h12M9 18h6" stroke={theme.fg} strokeWidth={1.6} strokeLinecap="round"/>
            </Svg>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.chipScroll} contentContainerStyle={s.chipContent}>
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <TouchableOpacity key={cat} style={[s.chip, { backgroundColor: active ? theme.accent : theme.surface2, borderColor: active ? theme.accent : theme.line }]} onPress={() => setActiveCategory(cat)}>
                <Text style={[s.chipTxt, { color: active ? theme.accentInk : theme.fg2, fontFamily: FONTS.mono }]}>{cat.toUpperCase()}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {filters.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.chipScroll} contentContainerStyle={s.chipContent}>
            {filters.map((f) => (
              <TouchableOpacity key={f} style={[s.filterChip, { backgroundColor: `${theme.accent}18`, borderColor: `${theme.accent}40` }]} onPress={() => setFilters((p) => p.filter((x) => x !== f))}>
                <Text style={[s.chipTxt, { color: theme.accent, fontFamily: FONTS.mono }]}>{f} ×</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <View style={s.section}>
          <View style={s.sectionHead}>
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
              <Path d="M12 2l2.4 7.4H22l-6.4 4.6 2.4 7.4L12 17l-6 4.4 2.4-7.4L2 9.4h7.6L12 2z" stroke={theme.accent} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
            <Text style={[s.sectionTitle, { color: theme.fg, fontFamily: FONTS.display }]}>Para tu nivel</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {EXERCISES.slice(0, 3).map((ex) => (
              <RecommendedCard key={ex.id} exercise={ex} theme={theme} onPress={() => navigation.navigate('ExerciseDetail', { exerciseId: ex.id })} />
            ))}
          </ScrollView>
        </View>

        <View style={s.section}>
          <Text style={[s.sectionTitle, { color: theme.fg, fontFamily: FONTS.display }]}>Todos · {filtered.length}</Text>
          {filtered.map((ex) => {
            const diff = DIFF_CHIP[ex.difficulty] ?? DIFF_CHIP.intermediate;
            return (
              <TouchableOpacity key={ex.id} style={[s.exRow, { borderBottomColor: theme.line }]} onPress={() => navigation.navigate('ExerciseDetail', { exerciseId: ex.id })} activeOpacity={0.7}>
                <ExThumb color={theme.accent} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[s.exName, { color: theme.fg, fontFamily: FONTS.semiBold }]}>{ex.name}</Text>
                  <Text style={[s.exMeta, { color: theme.muted, fontFamily: FONTS.mono }]}>{ex.category.toUpperCase()} · {ex.equipment.toUpperCase()}</Text>
                </View>
                <View style={[s.diffChip, { backgroundColor: diff.bg }]}>
                  <Text style={[s.diffTxt, { color: diff.color, fontFamily: FONTS.mono }]}>{diff.label}</Text>
                </View>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" style={{ marginLeft: 8 }}>
                  <Path d="M9 18l6-6-6-6" stroke={theme.dim} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: SCREEN_PADDING, paddingTop: 16 },
  eyebrow: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.6, marginBottom: 4 },
  title: { fontSize: 34, lineHeight: 32, letterSpacing: -1, marginBottom: 20 },
  searchRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  searchWrap: { flex: 1, height: 46, borderRadius: 99, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 10 },
  searchInput: { flex: 1, fontSize: 14 },
  filterBtn: { width: 46, height: 46, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  chipScroll: { marginBottom: 10 },
  chipContent: { gap: 6, paddingRight: 4 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99, borderWidth: 1 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99, borderWidth: 1 },
  chipTxt: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.8 },
  section: { marginBottom: 24 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  sectionTitle: { fontSize: 18, lineHeight: 20, letterSpacing: -0.4 },
  exRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  exName: { fontSize: 14, marginBottom: 2 },
  exMeta: { fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.6 },
  diffChip: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  diffTxt: { fontSize: 10 },
});
