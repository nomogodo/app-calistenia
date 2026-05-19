import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/useAppStore';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const RING_R = 56;
const CIRC = 2 * Math.PI * RING_R;

const MACROS = [
  { l: 'Proteína', c: 142, t: 180, u: 'g', clr: '#C8F046' },
  { l: 'Carbos', c: 188, t: 260, u: 'g', clr: '#7AB8FF' },
  { l: 'Grasa', c: 52, t: 75, u: 'g', clr: '#FFB070' },
];

const MEALS = [
  { t: '08:00', n: 'Desayuno', k: 640, p: 42, done: true },
  { t: '13:30', n: 'Comida', k: 780, p: 55, done: true },
  { t: '17:30', n: 'Pre-entreno', k: 240, p: 12, next: true },
  { t: '21:00', n: 'Cena', k: 740, p: 48 },
];

const WATER_FILLED = 6;
const WATER_TOTAL = 12;

export function NutritionDashboardScreen({ navigation }: any) {
  const colors = useTheme();
  const calories = 1840;
  const caloriesTarget = 2400;
  const caloriesLeft = caloriesTarget - calories;
  const ringProgress = calories / caloriesTarget;
  const ringOffset = CIRC * (1 - ringProgress);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.sm }}>
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>NUTRICIÓN · HOY</Text>
          <Text style={[TYPOGRAPHY.display, { fontSize: 28, marginTop: 8, color: colors.fg }]}>Macros y calorías</Text>
        </View>

        {/* Calorie ring */}
        <View
          style={{
            marginTop: SPACING.md, marginHorizontal: SPACING.md, padding: 20, borderRadius: 22,
            backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
            flexDirection: 'row', gap: 18, alignItems: 'center',
          }}
        >
          <View style={{ width: 130, height: 130, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={130} height={130} style={{ position: 'absolute' }}>
              <Circle cx={65} cy={65} r={RING_R} stroke={`${colors.fg}22`} strokeWidth={8} fill="none" />
              <Circle
                cx={65} cy={65} r={RING_R}
                stroke={colors.accent}
                strokeWidth={8}
                fill="none"
                strokeDasharray={CIRC}
                strokeDashoffset={ringOffset}
                strokeLinecap="round"
                transform="rotate(-90 65 65)"
              />
            </Svg>
            <View style={{ alignItems: 'center' }}>
              <Text style={[TYPOGRAPHY.display, { fontSize: 28, lineHeight: 30, color: colors.fg }]}>{calories.toLocaleString()}</Text>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: colors.muted, letterSpacing: 1, marginTop: 4 }]}>/ {caloriesTarget} KCAL</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>RESTANTES</Text>
            <Text style={[TYPOGRAPHY.display, { fontSize: 32, marginTop: 4, color: colors.fg }]}>
              {caloriesLeft}
              <Text style={{ fontSize: 12, color: colors.muted }}> kcal</Text>
            </Text>
            <Text style={{ fontSize: 12, color: colors.fg2, marginTop: 6, lineHeight: 18 }}>
              {'Tienes '}
              <Text style={{ color: colors.accent, fontWeight: '700' }}>cena + snack</Text>
              {' por delante.'}
            </Text>
          </View>
        </View>

        {/* Macros */}
        <View style={{ marginTop: 12, paddingHorizontal: SPACING.md, flexDirection: 'row', gap: 8 }}>
          {MACROS.map((m, i) => (
            <View key={i} style={{ flex: 1, padding: 12, borderRadius: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }}>
              <Text style={[TYPOGRAPHY.eyebrow, { fontSize: 9, color: colors.muted }]}>{m.l}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3, marginTop: 6 }}>
                <Text style={[TYPOGRAPHY.display, { fontSize: 20, color: colors.fg }]}>{m.c}</Text>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted }]}>/ {m.t}{m.u}</Text>
              </View>
              <View style={{ height: 4, marginTop: 10, borderRadius: 99, backgroundColor: colors.surface2, overflow: 'hidden' }}>
                <View style={{ width: `${(m.c / m.t) * 100}%` as any, height: '100%', backgroundColor: m.clr }} />
              </View>
            </View>
          ))}
        </View>

        {/* Water + steps */}
        <View style={{ marginTop: 12, paddingHorizontal: SPACING.md, flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 1, padding: 14, borderRadius: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>AGUA</Text>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.accent }]}>1,8 / 3,0L</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 4, marginTop: 10 }}>
              {Array.from({ length: WATER_TOTAL }).map((_, i) => (
                <View
                  key={i}
                  style={{
                    flex: 1, height: 28, borderRadius: 3,
                    backgroundColor: i < WATER_FILLED ? colors.accent : colors.surface2,
                  }}
                />
              ))}
            </View>
          </View>
          <View style={{ flex: 1, padding: 14, borderRadius: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }}>
            <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>PASOS</Text>
            <Text style={[TYPOGRAPHY.display, { fontSize: 24, marginTop: 4, color: colors.fg }]}>6.210</Text>
            <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted }]}>/ 10.000</Text>
          </View>
        </View>

        {/* Meals */}
        <View style={{ marginTop: SPACING.md, paddingHorizontal: SPACING.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
            <Text style={[TYPOGRAPHY.display, { fontSize: 18, color: colors.fg }]}>Comidas</Text>
            <Text style={[TYPOGRAPHY.eyebrow, { color: colors.accent }]}>Ver plan →</Text>
          </View>
          <View style={{ gap: 6 }}>
            {MEALS.map((m, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => navigation.navigate('MealDetail', { mealId: i })}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12,
                  borderRadius: 12, backgroundColor: colors.surface,
                  borderWidth: 1, borderColor: m.next ? colors.accent : colors.line,
                  opacity: m.done ? 0.55 : 1,
                }}
              >
                <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted, width: 38 }]}>{m.t}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: colors.fg }}>{m.n}</Text>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.muted, marginTop: 2 }]}>
                    {m.k} kcal · {m.p}g P
                  </Text>
                </View>
                <Text style={{ color: m.done ? colors.accent : colors.fg2, fontSize: 16 }}>
                  {m.done ? '✓' : '+'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action buttons */}
        <View style={{ marginTop: SPACING.md, paddingHorizontal: SPACING.md, flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('FoodScanner')}
            style={{
              flex: 1, height: 48, borderRadius: 12,
              borderWidth: 1, borderColor: colors.line,
              backgroundColor: colors.surface,
              flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Text style={{ color: colors.fg, fontSize: 16 }}>📷</Text>
            <Text style={{ fontSize: 13, fontWeight: '700', color: colors.fg }}>ESCANEAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('MealSwapper')}
            style={{
              flex: 1, height: 48, borderRadius: 12,
              backgroundColor: colors.accent,
              flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Text style={{ color: colors.accentInk, fontSize: 14 }}>✦</Text>
            <Text style={{ fontSize: 13, fontWeight: '700', color: colors.accentInk }}>GENERAR COMIDA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
