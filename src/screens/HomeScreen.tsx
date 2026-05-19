import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Svg, Path } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../hooks/useTheme';
import { FONTS } from '../constants/typography';
import { SCREEN_PADDING } from '../constants/spacing';
import { RootStackParamList } from '../navigation/types';
import { Meal } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

function ProgressBar({ value, max, color, bg }: { value: number; max: number; color: string; bg: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <View style={[pb.bg, { backgroundColor: bg }]}>
      <View style={[pb.fill, { backgroundColor: color, width: `${pct}%` as any }]} />
    </View>
  );
}
const pb = StyleSheet.create({
  bg: { height: 3, borderRadius: 99, marginTop: 6, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 99 },
});

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const theme = useTheme();
  const { todayWorkout, mealsToday, dayMetrics, user } = useAppStore();

  const handleStart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('Workout');
  };

  return (
    <SafeAreaView style={[s.container, { backgroundColor: theme.bg }]}>
      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <View style={{ flex: 1 }}>
            <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>MARTES · 19 MAY</Text>
            <Text style={[s.greeting, { color: theme.fg, fontFamily: FONTS.display }]}>{`Buenos días,\n${user.name}.`}</Text>
          </View>
          <View style={[s.notifBadge, { backgroundColor: theme.surface2 }]}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill={theme.accent}>
              <Path d="M13 2L4.09 12.96A1 1 0 005 14.5h7v7.5l8.91-10.96A1 1 0 0020 9.5h-7V2z" fill={theme.accent}/>
            </Svg>
            <View style={[s.notifPill, { backgroundColor: theme.accent }]}>
              <Text style={{ fontSize: 9, color: theme.accentInk, fontFamily: FONTS.mono }}>2</Text>
            </View>
          </View>
        </View>

        {/* Coach inline card */}
        <View style={[s.coachCard, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path d="M12 2l2.4 7.4H22l-6.4 4.6 2.4 7.4L12 17l-6 4.4 2.4-7.4L2 9.4h7.6L12 2z" stroke={theme.accent} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
          <Text style={[s.coachTxt, { color: theme.fg2, fontFamily: FONTS.medium }]}>
            <Text style={{ color: theme.fg, fontFamily: FONTS.semiBold }}>Coach: </Text>
            Tu sueño bajó un 12%. Adjusté el volumen de hoy.{' '}
            <Text style={{ color: theme.accent }}>No me defraudes.</Text>
          </Text>
        </View>

        {/* Hero workout card */}
        <View style={[s.hero, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <View style={s.heroTop}>
            <View style={s.heroEyebrow}>
              <View style={[s.dot, { backgroundColor: theme.accent }]} />
              <Text style={[s.eyebrow, { color: theme.accent, fontFamily: FONTS.mono }]}>ENTRENAMIENTO DE HOY</Text>
            </View>
            <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>
              SEMANA {todayWorkout.week} / {todayWorkout.totalWeeks}
            </Text>
          </View>
          <Text style={[s.heroTitle, { color: theme.fg, fontFamily: FONTS.display }]}>{todayWorkout.name}</Text>
          <Text style={[s.heroStats, { color: theme.fg2, fontFamily: FONTS.medium }]}>
            <Text style={{ color: theme.fg, fontFamily: FONTS.semiBold }}>{todayWorkout.exercises.length} ejercicios</Text>
            {' · '}
            <Text style={{ color: theme.fg, fontFamily: FONTS.semiBold }}>{todayWorkout.durationMin} min</Text>
            {' · '}
            <Text style={{ color: theme.fg, fontFamily: FONTS.semiBold }}>{todayWorkout.kcal} kcal</Text>
          </Text>

          <View style={[s.preview, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
            {todayWorkout.exercises.slice(0, 4).map((ex, i) => (
              <View key={i} style={s.previewRow}>
                <Text style={[s.exNum, { color: theme.dim, fontFamily: FONTS.mono }]}>{String(i + 1).padStart(2, '0')}</Text>
                <Text style={[s.exName, { color: theme.fg, fontFamily: FONTS.medium }]}>{ex.exercise.name}</Text>
                <Text style={[s.exSets, { color: theme.muted, fontFamily: FONTS.mono }]}>{ex.sets}×{ex.reps}</Text>
                <Text style={[s.exWt, { color: theme.accent, fontFamily: FONTS.mono }]}>{ex.weight}</Text>
              </View>
            ))}
            <Text style={[s.moreTxt, { color: theme.dim, fontFamily: FONTS.mono }]}>
              + {Math.max(0, todayWorkout.exercises.length - 4)} MÁS
            </Text>
          </View>

          <TouchableOpacity style={[s.startBtn, { backgroundColor: theme.accent }]} onPress={handleStart} activeOpacity={0.85}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill={theme.accentInk}>
              <Path d="M5 3l14 9-14 9V3z" fill={theme.accentInk}/>
            </Svg>
            <Text style={[s.startTxt, { color: theme.accentInk, fontFamily: FONTS.bold }]}>EMPEZAR ENTRENO</Text>
          </TouchableOpacity>
        </View>

        {/* Metrics */}
        <View style={s.metricsRow}>
          {[
            { label: 'CALORÍAS', val: `${dayMetrics.caloriesConsumed}`, curr: dayMetrics.caloriesConsumed, goal: dayMetrics.caloriesGoal, unit: `/ ${dayMetrics.caloriesGoal}` },
            { label: 'PROTEÍNA', val: `${dayMetrics.proteinG}g`, curr: dayMetrics.proteinG, goal: dayMetrics.proteinGoalG, unit: `/ ${dayMetrics.proteinGoalG}g` },
            { label: 'PASOS', val: `${(dayMetrics.steps/1000).toFixed(1)}k`, curr: dayMetrics.steps, goal: dayMetrics.stepsGoal, unit: `/ ${dayMetrics.stepsGoal/1000}k` },
          ].map((m, i) => (
            <View key={i} style={[s.metricCard, { backgroundColor: theme.surface, borderColor: theme.line }]}>
              <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>{m.label}</Text>
              <Text style={[s.metricVal, { color: theme.fg, fontFamily: FONTS.display }]}>{m.val}</Text>
              <Text style={[s.metricUnit, { color: theme.muted, fontFamily: FONTS.mono }]}>{m.unit}</Text>
              <ProgressBar value={m.curr} max={m.goal} color={theme.accent} bg={theme.surface2} />
            </View>
          ))}
        </View>

        {/* Streak + Recovery */}
        <View style={s.streakRow}>
          <View style={[s.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
            <View style={s.cardHead}>
              <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>RACHA</Text>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill={theme.accent}>
                <Path d="M12 2c0 4-4 5-4 9a4 4 0 008 0c0-4-4-5-4-9z" fill={theme.accent}/>
              </Svg>
            </View>
            <Text style={[s.bigNum, { color: theme.fg, fontFamily: FONTS.display }]}>{dayMetrics.streakDays} días</Text>
            <View style={s.streakDots}>
              {dayMetrics.last7Days.map((on, i) => (
                <View key={i} style={[s.streakDot, { backgroundColor: on ? theme.accent : theme.surface2 }]} />
              ))}
            </View>
          </View>
          <View style={[s.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
            <View style={s.cardHead}>
              <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>RECUPERACIÓN</Text>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill={theme.accent}>
                <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill={theme.accent}/>
              </Svg>
            </View>
            <Text style={[s.bigNum, { color: theme.fg, fontFamily: FONTS.display }]}>{dayMetrics.recoveryScore}%</Text>
            <Text style={[s.recoveryLbl, { color: theme.fg2, fontFamily: FONTS.medium }]}>Listo para entrenar fuerte</Text>
          </View>
        </View>

        {/* Meals */}
        <View style={{ marginBottom: 24 }}>
          <View style={s.mealsHead}>
            <Text style={[s.sectionTitle, { color: theme.fg, fontFamily: FONTS.display }]}>Comidas de hoy</Text>
            <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>VER PLAN →</Text>
          </View>
          {mealsToday.map((meal: Meal) => (
            <View
              key={meal.id}
              style={[
                s.mealRow,
                { borderBottomColor: theme.line },
                meal.status === 'done' && { opacity: 0.55 },
                meal.status === 'next' && { borderWidth: 1, borderRadius: 10, borderColor: theme.accent, paddingHorizontal: 10, marginBottom: 2 },
              ]}
            >
              <Text style={[s.mealTime, { color: theme.muted, fontFamily: FONTS.mono }]}>{meal.time}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[s.mealType, { color: theme.fg, fontFamily: FONTS.semiBold }]}>{meal.type}</Text>
                <Text style={[s.mealDesc, { color: theme.muted, fontFamily: FONTS.medium }]}>{meal.description}</Text>
              </View>
              <Text style={[s.mealKcal, { color: theme.muted, fontFamily: FONTS.mono }]}>{meal.kcal}</Text>
              <View style={s.checkWrap}>
                {meal.status === 'done'
                  ? <Svg width={14} height={14} viewBox="0 0 24 24" fill="none"><Path d="M20 6L9 17l-5-5" stroke={theme.positive} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/></Svg>
                  : <View style={[s.checkbox, { borderColor: meal.status === 'next' ? theme.accent : theme.muted }]} />}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: SCREEN_PADDING, paddingTop: 8 },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 },
  eyebrow: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.6 },
  greeting: { fontSize: 32, lineHeight: 30, letterSpacing: -1, marginTop: 4 },
  notifBadge: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  notifPill: { position: 'absolute', top: -2, right: -2, width: 16, height: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  coachCard: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', padding: 14, borderRadius: 12, borderWidth: 1, marginBottom: 16 },
  coachTxt: { flex: 1, fontSize: 13, lineHeight: 19 },
  hero: { borderRadius: 22, borderWidth: 1, padding: 20, marginBottom: 20 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  heroEyebrow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  heroTitle: { fontSize: 34, lineHeight: 32, letterSpacing: -1, marginBottom: 8 },
  heroStats: { fontSize: 13, lineHeight: 18, marginBottom: 14 },
  preview: { borderRadius: 12, padding: 12, marginBottom: 14, gap: 8 },
  previewRow: { flexDirection: 'row', alignItems: 'center' },
  exNum: { fontSize: 11, width: 28 },
  exName: { flex: 1, fontSize: 13 },
  exSets: { fontSize: 11, marginRight: 8 },
  exWt: { fontSize: 11, width: 44, textAlign: 'right' },
  moreTxt: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 },
  startBtn: { height: 56, borderRadius: 99, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  startTxt: { fontSize: 15, letterSpacing: 0.3 },
  metricsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  metricCard: { flex: 1, padding: 12, borderRadius: 12, borderWidth: 1 },
  metricVal: { fontSize: 22, lineHeight: 24, marginTop: 2 },
  metricUnit: { fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.4 },
  streakRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  card: { flex: 1, padding: 14, borderRadius: 14, borderWidth: 1 },
  cardHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  bigNum: { fontSize: 32, lineHeight: 34 },
  streakDots: { flexDirection: 'row', gap: 5, marginTop: 10 },
  streakDot: { width: 8, height: 8, borderRadius: 4 },
  recoveryLbl: { fontSize: 11, lineHeight: 15, marginTop: 4 },
  mealsHead: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { fontSize: 18, lineHeight: 20, letterSpacing: -0.4 },
  mealRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, gap: 8 },
  mealTime: { fontSize: 11, width: 38 },
  mealType: { fontSize: 13 },
  mealDesc: { fontSize: 11 },
  mealKcal: { fontSize: 11, width: 36, textAlign: 'right' },
  checkWrap: { width: 20, alignItems: 'center' },
  checkbox: { width: 14, height: 14, borderRadius: 3, borderWidth: 1 },
});
