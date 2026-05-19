import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { Svg, Path, Circle, Line } from 'react-native-svg';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../hooks/useTheme';
import { FONTS } from '../constants/typography';
import { speakCoach } from '../services/tts/speech';

const { width: SW, height: SH } = Dimensions.get('window');

const COACH_MSGS = [
  'Saca pecho. Estás cayendo adelante. Mete aire y empuja con los talones.',
  'Más profundo. Cadera por debajo de rodilla. No estamos para medias tintas.',
  'Rodillas en línea. Controla la bajada. Vamos.',
  'Eso es. Esa es la profundidad. Sigue.',
  'Una más. Vamos. Sin excusas.',
];

function WireframeStage({ accentColor }: { accentColor: string }) {
  return (
    <Svg width={SW} height={SH} viewBox={`0 0 ${SW} ${SH}`} style={StyleSheet.absoluteFill}>
      {Array.from({ length: 12 }).map((_, i) => (
        <Line key={`v${i}`} x1={i * (SW / 11)} y1={0} x2={i * (SW / 11)} y2={SH}
          stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <Line key={`h${i}`} x1={0} y1={i * (SH / 19)} x2={SW} y2={i * (SH / 19)}
          stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
      ))}
      {/* Head */}
      <Circle cx={SW / 2} cy={160} r={22} stroke={accentColor} strokeWidth={1.5} fill="none" />
      {/* Spine */}
      <Line x1={SW/2} y1={182} x2={SW/2} y2={340} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.6}/>
      {/* Shoulders */}
      <Line x1={SW/2-55} y1={210} x2={SW/2+55} y2={210} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.6}/>
      {/* Left arm */}
      <Line x1={SW/2-55} y1={210} x2={SW/2-70} y2={290} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.6}/>
      <Line x1={SW/2-70} y1={290} x2={SW/2-60} y2={360} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.6}/>
      {/* Right arm */}
      <Line x1={SW/2+55} y1={210} x2={SW/2+70} y2={290} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.6}/>
      <Line x1={SW/2+70} y1={290} x2={SW/2+60} y2={360} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.6}/>
      {/* Hips */}
      <Line x1={SW/2-40} y1={340} x2={SW/2+40} y2={340} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.6}/>
      {/* Left leg */}
      <Line x1={SW/2-40} y1={340} x2={SW/2-65} y2={460} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.6}/>
      <Line x1={SW/2-65} y1={460} x2={SW/2-50} y2={570} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.6}/>
      {/* Right leg */}
      <Line x1={SW/2+40} y1={340} x2={SW/2+65} y2={460} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.6}/>
      <Line x1={SW/2+65} y1={460} x2={SW/2+50} y2={570} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.6}/>
      {/* Joint markers */}
      {[
        [SW/2, 160], [SW/2-55, 210], [SW/2+55, 210],
        [SW/2-70, 290], [SW/2+70, 290], [SW/2-40, 340], [SW/2+40, 340],
        [SW/2-65, 460], [SW/2+65, 460], [SW/2-50, 570], [SW/2+50, 570],
      ].map(([cx, cy], i) => (
        <Circle key={i} cx={cx} cy={cy} r={4} fill={accentColor} stroke="white" strokeWidth={1} />
      ))}
    </Svg>
  );
}

export default function WorkoutScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { activeWorkout, todayWorkout, startWorkout, completeSet, nextExercise, prevExercise, tickTimer } = useAppStore();
  const [permission, requestPermission] = useCameraPermissions();
  const [coachMsgIdx, setCoachMsgIdx] = useState(0);
  const [isTalking, setIsTalking] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const waveAnim = useRef(Array.from({ length: 7 }, () => new Animated.Value(4))).current;
  const recAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => { if (!activeWorkout.isActive) startWorkout(); }, []);

  useEffect(() => {
    const interval = setInterval(() => tickTimer(), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(recAnim, { toValue: 1.5, duration: 700, useNativeDriver: true }),
        Animated.timing(recAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (!isTalking) return;
    const anims = waveAnim.map((anim, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 60),
          Animated.timing(anim, { toValue: 3 + Math.random() * 10, duration: 180, useNativeDriver: false }),
          Animated.timing(anim, { toValue: 4, duration: 180, useNativeDriver: false }),
        ])
      )
    );
    anims.forEach((a) => a.start());
    return () => anims.forEach((a) => a.stop());
  }, [isTalking]);

  const handleCoachSpeak = async () => {
    const msg = COACH_MSGS[coachMsgIdx % COACH_MSGS.length];
    setIsTalking(true);
    setCoachMsgIdx((i) => i + 1);
    await speakCoach(msg);
    setIsTalking(false);
  };

  const handleCompleteSet = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    completeSet();
    if (!activeWorkout.isActive) navigation.goBack();
  };

  const currentEx = todayWorkout.exercises[activeWorkout.currentExerciseIndex];
  const elapsedMin = Math.floor(activeWorkout.elapsedSeconds / 60);
  const elapsedSec = activeWorkout.elapsedSeconds % 60;
  const timeStr = `${String(elapsedMin).padStart(2,'0')}:${String(elapsedSec).padStart(2,'0')}`;
  const coachMsg = COACH_MSGS[coachMsgIdx % COACH_MSGS.length];

  return (
    <View style={[s.container, { backgroundColor: '#08090A' }]}>
      {showCamera && permission?.granted
        ? <CameraView style={StyleSheet.absoluteFill} facing="front" />
        : null}
      <WireframeStage accentColor={theme.accent} />
      <View style={s.overlay} />

      {/* Top bar */}
      <View style={s.topBar}>
        <TouchableOpacity style={[s.circleBtn, { backgroundColor: 'rgba(0,0,0,0.45)' }]} onPress={() => navigation.goBack()}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path d="M18 6L6 18M6 6l12 12" stroke={theme.fg} strokeWidth={1.8} strokeLinecap="round"/>
          </Svg>
        </TouchableOpacity>
        <View style={[s.exPill, { backgroundColor: 'rgba(0,0,0,0.55)' }]}>
          <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>
            EJERCICIO {activeWorkout.currentExerciseIndex + 1} / {todayWorkout.exercises.length}
          </Text>
          <Text style={[s.exName, { color: theme.fg, fontFamily: FONTS.semiBold }]}>
            {currentEx?.exercise.name ?? '—'}
          </Text>
        </View>
        <TouchableOpacity
          style={[s.circleBtn, { backgroundColor: 'rgba(0,0,0,0.45)' }]}
          onPress={handleCoachSpeak}
        >
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" stroke={theme.accent} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M17.5 3a2.121 2.121 0 013 3L12 14.5l-4 1 1-4L17.5 3z" stroke={theme.accent} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>
      </View>

      {/* REC */}
      <View style={s.recRow}>
        <View style={[s.recPill, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
          <Animated.View style={[s.recDot, { transform: [{ scale: recAnim }] }]} />
          <Text style={[s.recTxt, { color: theme.fg, fontFamily: FONTS.mono }]}>REC · {timeStr}</Text>
        </View>
      </View>

      {/* Rep counter */}
      <View style={s.repRow}>
        <View>
          <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>REP</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={[s.repBig, { color: theme.accent, fontFamily: FONTS.display }]}>
              {String(activeWorkout.currentReps).padStart(2, '0')}
            </Text>
            <Text style={[s.repTotal, { color: theme.dim, fontFamily: FONTS.display }]}>
              /{currentEx?.reps ?? '—'}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>SERIE</Text>
          <Text style={[s.serieNum, { color: theme.fg, fontFamily: FONTS.display }]}>
            {activeWorkout.currentSet}/{currentEx?.sets ?? '—'}
          </Text>
          <Text style={[s.weightTxt, { color: theme.accent, fontFamily: FONTS.mono }]}>
            {currentEx?.weight ?? '—'}
          </Text>
        </View>
      </View>

      {/* Angle tags */}
      <View style={[s.angleTag, s.angleLeft, { borderColor: theme.accent, backgroundColor: 'rgba(0,0,0,0.6)' }]}>
        <Text style={[s.angleTxt, { color: theme.accent, fontFamily: FONTS.mono }]}>92° RODILLA ✓</Text>
      </View>
      <View style={[s.angleTag, s.angleRight, { borderColor: theme.danger, backgroundColor: 'rgba(0,0,0,0.6)' }]}>
        <Text style={[s.angleTxt, { color: theme.danger, fontFamily: FONTS.mono }]}>ESPALDA -8°</Text>
      </View>

      {/* Coach bubble */}
      <View style={[s.coachBubble, { backgroundColor: 'rgba(15,17,19,0.85)', borderColor: theme.accent }]}>
        <View style={[s.coachAvatar, { backgroundColor: theme.accent }]}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path d="M12 2l2.4 7.4H22l-6.4 4.6 2.4 7.4L12 17l-6 4.4 2.4-7.4L2 9.4h7.6L12 2z" stroke={theme.accentInk} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <Text style={[s.eyebrow, { color: theme.accent, fontFamily: FONTS.mono }]}>COACH · EN VIVO</Text>
            {isTalking && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                {waveAnim.map((anim, i) => (
                  <Animated.View key={i} style={[s.waveBar, { backgroundColor: theme.accent, height: anim }]} />
                ))}
              </View>
            )}
          </View>
          <Text style={[s.coachMsg, { color: theme.fg2, fontFamily: FONTS.medium }]}>
            {coachMsg.split('. ').map((sentence, i, arr) =>
              i === arr.length - 1
                ? <Text key={i} style={{ color: theme.accent, fontFamily: FONTS.semiBold }}>{sentence}</Text>
                : <Text key={i}>{sentence}. </Text>
            )}
          </Text>
        </View>
      </View>

      {/* Bottom controls */}
      <View style={[s.bottomControls, { backgroundColor: 'rgba(8,9,10,0.85)' }]}>
        <View style={s.scoreRow}>
          {[
            { label: 'FORMA', value: `${activeWorkout.formScore}`, color: theme.accent },
            { label: 'TEMPO', value: activeWorkout.tempo, color: theme.fg },
            { label: 'ROM', value: `${activeWorkout.rom}%`, color: theme.accent },
            { label: 'DESCANSO', value: '01:30', color: theme.fg },
          ].map((item, i) => (
            <View key={i} style={[s.scoreCard, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
              <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>{item.label}</Text>
              <Text style={[s.scoreVal, { color: item.color, fontFamily: FONTS.monoSemiBold }]}>{item.value}</Text>
            </View>
          ))}
        </View>
        <View style={s.actionRow}>
          <TouchableOpacity style={[s.navBtn, { backgroundColor: theme.surface2 }]}
            onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); prevExercise(); }}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M15 18l-6-6 6-6" stroke={theme.fg} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={[s.completeBtn, { backgroundColor: theme.accent }]} onPress={handleCompleteSet} activeOpacity={0.85}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M20 6L9 17l-5-5" stroke={theme.accentInk} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
            <Text style={[s.completeTxt, { color: theme.accentInk, fontFamily: FONTS.bold }]}>COMPLETAR SERIE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.navBtn, { backgroundColor: theme.surface2 }]}
            onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); nextExercise(); }}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M9 18l6-6-6-6" stroke={theme.fg} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)' },
  topBar: { position: 'absolute', top: 60, left: 20, right: 20, flexDirection: 'row', alignItems: 'center', gap: 10 },
  circleBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)' },
  exPill: { flex: 1, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)' },
  eyebrow: { fontSize: 9, textTransform: 'uppercase', letterSpacing: 1 },
  exName: { fontSize: 13 },
  recRow: { position: 'absolute', top: 130, left: 0, right: 0, alignItems: 'center' },
  recPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 99 },
  recDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF5050' },
  recTxt: { fontSize: 10, letterSpacing: 1 },
  repRow: { position: 'absolute', top: 165, left: 24, right: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  repBig: { fontSize: 72, lineHeight: 64 },
  repTotal: { fontSize: 28, lineHeight: 32 },
  serieNum: { fontSize: 32, lineHeight: 34 },
  weightTxt: { fontSize: 11, letterSpacing: 0.5 },
  angleTag: { position: 'absolute', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1 },
  angleLeft: { left: 24, top: '52%' as any },
  angleRight: { right: 24, top: '48%' as any },
  angleTxt: { fontSize: 10, letterSpacing: 0.5, textTransform: 'uppercase' },
  coachBubble: { position: 'absolute', bottom: 215, left: 20, right: 20, flexDirection: 'row', gap: 10, alignItems: 'flex-start', paddingHorizontal: 16, paddingVertical: 14, borderRadius: 18, borderWidth: 1 },
  coachAvatar: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  waveBar: { width: 2, borderRadius: 1 },
  coachMsg: { fontSize: 13, lineHeight: 19 },
  bottomControls: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: 44, paddingTop: 16 },
  scoreRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  scoreCard: { flex: 1, padding: 8, borderRadius: 10, alignItems: 'center' },
  scoreVal: { fontSize: 16, marginTop: 2 },
  actionRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  navBtn: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  completeBtn: { flex: 1, height: 56, borderRadius: 99, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  completeTxt: { fontSize: 14, letterSpacing: 0.3 },
});
