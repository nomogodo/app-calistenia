import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient as SvgGradient, Stop, Rect, Text as SvgText } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const TIME_FILTERS = ['7D', '1M', '3M', '6M', '1A', 'TODO'];

const STRENGTH = [
  { e: 'Press banca', o: 70, n: 82, u: 100 },
  { e: 'Sentadilla', o: 100, n: 122, u: 140 },
  { e: 'Peso muerto', o: 120, n: 145, u: 160 },
  { e: 'Press militar', o: 45, n: 52, u: 70 },
];

const BAR_DATA = [
  { x: 0, h: 110, m: 'PECHO' },
  { x: 50, h: 130, m: 'ESPALDA' },
  { x: 100, h: 90, m: 'PIERNA' },
  { x: 150, h: 60, m: 'HOMBRO' },
  { x: 200, h: 78, m: 'BRAZO' },
  { x: 250, h: 42, m: 'CORE' },
];

const QUICK = [
  { icon: '📷', t: 'Fotos progreso', s: 'Última: hace 5d', screen: 'BodyPhotos' },
  { icon: '📍', t: 'Medidas', s: '5 medidas', screen: 'Biometrics' },
  { icon: '🏆', t: 'Récords', s: '12 PRs', screen: 'PRLog' },
  { icon: '❤️', t: 'Salud', s: 'Apple Health', screen: 'PRLog' },
];

export function ProgressHubScreen({ navigation }: any) {
  const colors = useTheme();
  const [timeFilter, setTimeFilter] = useState(2);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.sm }}>
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>PROGRESO · 12 SEMANAS</Text>
          <Text style={[TYPOGRAPHY.display, { fontSize: 30, marginTop: 8, color: colors.fg }]}>
            {'+'}{
              <Text style={{ color: colors.accent }}>4,2 kg</Text>
            }{'
de músculo.'}
          </Text>
        </View>

        {/* Time filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, gap: 6, flexDirection: 'row' }}
        >
          {TIME_FILTERS.map((t, i) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTimeFilter(i)}
              style={{
                paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99,
                backgroundColor: timeFilter === i ? colors.accent : colors.surface,
                borderWidth: 1, borderColor: timeFilter === i ? colors.accent : colors.line,
              }}
            >
              <Text style={[TYPOGRAPHY.mono, {
                fontSize: 11,
                color: timeFilter === i ? colors.accentInk : colors.fg,
                fontWeight: '700',
              }]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Weight chart */}
        <View
          style={{
            marginTop: SPACING.md, marginHorizontal: SPACING.md, padding: 16,
            borderRadius: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View>
              <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>PESO CORPORAL</Text>
              <Text style={[TYPOGRAPHY.display, { fontSize: 30, marginTop: 4, color: colors.fg }]}>
                78,4
                <Text style={{ fontSize: 12, color: colors.muted }}> kg</Text>
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 10, color: colors.accent }]}>▲ +2,8 kg</Text>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: colors.muted, marginTop: 2 }]}>vs 3 MESES</Text>
            </View>
          </View>
          <Svg viewBox="0 0 320 100" width="100%" height={90} style={{ marginTop: 12 }} preserveAspectRatio="none">
            <Defs>
              <SvgGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={colors.accent} stopOpacity={0.4} />
                <Stop offset="100%" stopColor={colors.accent} stopOpacity={0} />
              </SvgGradient>
            </Defs>
            <Path d="M0,72 L26,68 L52,70 L78,62 L104,60 L130,52 L156,50 L182,44 L208,46 L234,38 L260,32 L286,28 L320,22 L320,100 L0,100 Z" fill="url(#lineFill)" />
            <Path d="M0,72 L26,68 L52,70 L78,62 L104,60 L130,52 L156,50 L182,44 L208,46 L234,38 L260,32 L286,28 L320,22" stroke={colors.accent} strokeWidth={2} fill="none" />
            <Circle cx={320} cy={22} r={4} fill={colors.accent} stroke={colors.bg} strokeWidth={2} />
          </Svg>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
            {['Feb', 'Mar', 'Abr', 'May'].map((m) => (
              <Text key={m} style={[TYPOGRAPHY.mono, { fontSize: 9, color: colors.muted }]}>{m}</Text>
            ))}
          </View>
        </View>

        {/* Strength 1RM */}
        <View style={{ marginTop: SPACING.md, paddingHorizontal: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>FUERZA · 1RM ESTIMADO</Text>
          <View style={{ padding: 16, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }}>
            {STRENGTH.map((s, i) => (
              <View key={i} style={{ paddingVertical: 8, borderTopWidth: i > 0 ? 1 : 0, borderTopColor: colors.line }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: colors.fg }}>{s.e}</Text>
                  <Text style={[TYPOGRAPHY.mono, { fontSize: 11 }]}>
                    <Text style={{ color: colors.muted }}>{s.o} kg → </Text>
                    <Text style={{ color: colors.accent, fontWeight: '700' }}>{s.n} kg</Text>
                  </Text>
                </View>
                <View style={{ position: 'relative', height: 4, backgroundColor: colors.surface2, borderRadius: 99, overflow: 'hidden' }}>
                  <View style={{ position: 'absolute', left: 0, width: `${(s.o / s.u) * 100}%` as any, height: '100%', backgroundColor: colors.line2 }} />
                  <View style={{ position: 'absolute', left: 0, width: `${(s.n / s.u) * 100}%` as any, height: '100%', backgroundColor: colors.accent }} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Volume bar chart */}
        <View style={{ marginTop: SPACING.md, paddingHorizontal: SPACING.md }}>
          <Text style={[TYPOGRAPHY.eyebrow, { marginBottom: 10, color: colors.muted }]}>VOLUMEN POR GRUPO · MES</Text>
          <View style={{ padding: 16, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }}>
            <Svg viewBox="0 0 280 140" width="100%" height={130}>
              {BAR_DATA.map((b, i) => (
                <React.Fragment key={i}>
                  <Rect x={b.x + 10} y={130 - b.h} width={30} height={b.h} rx={3} fill={colors.accent} fillOpacity={i === 1 ? 1 : 0.6} />
                  <SvgText x={b.x + 25} y={138} fontSize={8} textAnchor="middle" fill={colors.muted} fontFamily="monospace">{b.m}</SvgText>
                </React.Fragment>
              ))}
            </Svg>
          </View>
        </View>

        {/* Quick actions */}
        <View style={{ marginTop: SPACING.md, paddingHorizontal: SPACING.md, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {QUICK.map((q, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => navigation.navigate(q.screen)}
              style={{
                width: '48%', padding: 14, borderRadius: 12,
                backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
                flexDirection: 'row', alignItems: 'center', gap: 10,
              }}
            >
              <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: colors.surface2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16 }}>{q.icon}</Text>
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: colors.fg }} numberOfLines={1}>{q.t}</Text>
                <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: colors.muted, marginTop: 2 }]}>{q.s}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
