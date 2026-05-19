import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/useAppStore';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const TOTAL_REST = 120;
const CIRCUMFERENCE = 2 * Math.PI * 124;

export function RestTimerScreen({ navigation }: any) {
  const colors = useTheme();
  const { activeWorkout, tickRest, skipRest } = useAppStore();
  const restSeconds = activeWorkout.restSecondsLeft;

  const progress = 1 - restSeconds / TOTAL_REST;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  useEffect(() => {
    if (restSeconds <= 0) {
      navigation.goBack();
      return;
    }
    const timer = setInterval(tickRest, 1000);
    return () => clearInterval(timer);
  }, [restSeconds]);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const handleSkip = () => {
    skipRest();
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* radial glow */}
      <View
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 400,
          opacity: 0.12, backgroundColor: colors.accent,
          borderBottomLeftRadius: 9999, borderBottomRightRadius: 9999,
        }}
        pointerEvents="none"
      />

      <View style={{ flex: 1, paddingHorizontal: SPACING.md, paddingTop: SPACING.md, paddingBottom: 40 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>DESCANSO {'·'} ENTRE SERIE 2 Y 3</Text>
          <TouchableOpacity
            onPress={handleSkip}
            style={{
              width: 36, height: 36, borderRadius: 99,
              backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ color: colors.fg, fontSize: 14 }}>{'✕'}</Text>
          </TouchableOpacity>
        </View>

        {/* Ring */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 280, height: 280, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={280} height={280} style={{ position: 'absolute' }}>
              <Circle cx={140} cy={140} r={124} stroke={`${colors.fg}22`} strokeWidth={6} fill="none" />
              <Circle
                cx={140} cy={140} r={124}
                stroke={colors.accent} strokeWidth={6} fill="none"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform="rotate(-90 140 140)"
              />
            </Svg>
            <View style={{ alignItems: 'center' }}>
              <Text style={[TYPOGRAPHY.eyebrow, { color: colors.accent }]}>{'● DESCANSANDO'}</Text>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 96, lineHeight: 100, letterSpacing: -4, color: colors.fg }]}>
                {fmt(restSeconds)}
              </Text>
              <Text style={[TYPOGRAPHY.mono, { fontSize: 11, color: colors.muted, marginTop: 4 }]}>
                DE {fmt(TOTAL_REST)}
              </Text>
            </View>
          </View>
        </View>

        {/* Coach tip */}
        <View
          style={{
            padding: 14, borderRadius: 16,
            backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.accent,
            flexDirection: 'row', gap: 12, alignItems: 'flex-start', marginBottom: 16,
          }}
        >
          <Text style={{ color: colors.accent, fontSize: 18 }}>{'✦'}</Text>
          <Text style={{ flex: 1, fontSize: 13, lineHeight: 20, color: colors.fg2 }}>
            {'La última serie llegó a '}
            <Text style={{ color: colors.accent, fontWeight: '700' }}>RIR 1</Text>
            {'. Mantén el peso. Próxima: '}
            <Text style={{ color: colors.fg, fontWeight: '600' }}>72,5 kg {'×'} 6-8</Text>
            {'.'}
          </Text>
        </View>

        {/* Next exercise */}
        <View
          style={{
            flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12,
            borderRadius: 12, backgroundColor: colors.surface,
            borderWidth: 1, borderColor: colors.line, marginBottom: 14,
          }}
        >
          <View style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: colors.surface2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 22 }}>{'🏋️'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[TYPOGRAPHY.eyebrow, { fontSize: 9, color: colors.muted }]}>SIGUIENTE {'·'} SERIE 3 DE 4</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 2, color: colors.fg }}>Press banca {'·'} 72,5 kg {'×'} 6-8</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity
            style={{
              width: 56, height: 48, borderRadius: 12,
              borderWidth: 1, borderColor: colors.line,
              backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ color: colors.fg, fontSize: 20 }}>{'+'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSkip}
            style={{
              flex: 1, height: 48, borderRadius: 12,
              backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '700', color: colors.accentInk, letterSpacing: 1 }}>SALTAR DESCANSO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
