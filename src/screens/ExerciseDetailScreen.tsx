import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Svg, Path, Circle, Line, Rect } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../hooks/useTheme';
import { FONTS } from '../constants/typography';
import { SCREEN_PADDING } from '../constants/spacing';
import { EXERCISES } from '../constants/exercises';
import { RootStackParamList } from '../navigation/types';

type Route = RouteProp<RootStackParamList, 'ExerciseDetail'>;
const { width: SW } = Dimensions.get('window');
const VIDEO_H = 340;

function VideoStage({ accentColor }: { accentColor: string }) {
  return (
    <Svg width={SW} height={VIDEO_H} viewBox={`0 0 ${SW} ${VIDEO_H}`} fill="none">
      {Array.from({ length: 10 }).map((_, i) => (
        <Path key={`v${i}`} d={`M${i*(SW/9)} 0 L${i*(SW/9)} ${VIDEO_H}`} stroke="rgba(255,255,255,0.04)" strokeWidth={1}/>
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <Path key={`h${i}`} d={`M0 ${i*(VIDEO_H/7)} L${SW} ${i*(VIDEO_H/7)}`} stroke="rgba(255,255,255,0.04)" strokeWidth={1}/>
      ))}
      <Circle cx={SW/2} cy={65} r={20} stroke={accentColor} strokeWidth={1.5} fill="none"/>
      <Line x1={SW/2} y1={85} x2={SW/2} y2={195} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.7}/>
      <Line x1={SW/2-50} y1={110} x2={SW/2+50} y2={110} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.7}/>
      <Line x1={SW/2-50} y1={110} x2={SW/2-65} y2={155} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.7}/>
      <Line x1={SW/2+50} y1={110} x2={SW/2+65} y2={155} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.7}/>
      <Line x1={SW/2-90} y1={108} x2={SW/2+90} y2={108} stroke={accentColor} strokeWidth={3} strokeOpacity={0.9}/>
      <Rect x={SW/2-90} y={100} width={8} height={16} fill={accentColor} fillOpacity={0.6} rx={2}/>
      <Rect x={SW/2+82} y={100} width={8} height={16} fill={accentColor} fillOpacity={0.6} rx={2}/>
      <Line x1={SW/2-35} y1={195} x2={SW/2+35} y2={195} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.7}/>
      <Line x1={SW/2-35} y1={195} x2={SW/2-60} y2={265} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.7}/>
      <Line x1={SW/2-60} y1={265} x2={SW/2-45} y2={320} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.7}/>
      <Line x1={SW/2+35} y1={195} x2={SW/2+60} y2={265} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.7}/>
      <Line x1={SW/2+60} y1={265} x2={SW/2+45} y2={320} stroke={accentColor} strokeWidth={1.5} strokeOpacity={0.7}/>
      {[[SW/2,65],[SW/2-50,110],[SW/2+50,110],[SW/2-35,195],[SW/2+35,195],[SW/2-60,265],[SW/2+60,265],[SW/2-45,320],[SW/2+45,320]]
        .map(([cx,cy],i)=>(<Circle key={i} cx={cx} cy={cy} r={4} fill={accentColor} stroke="white" strokeWidth={1}/>))}
    </Svg>
  );
}

export default function ExerciseDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const theme = useTheme();
  const [playing, setPlaying] = useState(false);
  const exercise = EXERCISES.find((e) => e.id === route.params?.exerciseId) ?? EXERCISES[1];
  const diffMap: Record<string, string> = { beginner: 'PRINCIPIANTE', intermediate: 'INTERMEDIO', advanced: 'AVANZADO', elite: 'ÉLITE' };

  return (
    <View style={[s.container, { backgroundColor: theme.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[s.videoHeader, { backgroundColor: theme.surface2 }]}>
          <VideoStage accentColor={theme.accent} />
          <View style={s.videoTopBar}>
            <TouchableOpacity style={[s.circleBtn, { backgroundColor: 'rgba(0,0,0,0.55)' }]} onPress={() => navigation.goBack()}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path d="M15 18l-6-6 6-6" stroke={theme.fg} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
              </Svg>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={[s.circleBtn, { backgroundColor: 'rgba(0,0,0,0.55)' }]}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={theme.fg} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
              </Svg>
            </TouchableOpacity>
          </View>
          <View style={[s.iaBadge, { borderColor: theme.accent, backgroundColor: 'rgba(0,0,0,0.55)' }]}>
            <View style={[s.recDot, { backgroundColor: theme.accent }]}/>
            <Text style={[s.iaTxt, { color: theme.accent, fontFamily: FONTS.mono }]}>VIDEO IA · LOW-POLY</Text>
          </View>
          <View style={[s.anglePill, { backgroundColor: 'rgba(0,0,0,0.55)', borderColor: theme.accent }]}>
            <Text style={[s.angleTxt, { color: theme.accent, fontFamily: FONTS.mono }]}>RODILLA 93°</Text>
          </View>
          <View style={s.playerControls}>
            <TouchableOpacity style={[s.playBtn, { backgroundColor: theme.accent }]} onPress={() => setPlaying((p) => !p)}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill={theme.accentInk}>
                {playing
                  ? <Path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill={theme.accentInk}/>
                  : <Path d="M5 3l14 9-14 9V3z" fill={theme.accentInk}/>}
              </Svg>
            </TouchableOpacity>
            <View style={s.progressTrack}>
              <View style={[s.progressFill, { width: '38%', backgroundColor: theme.accent }]}/>
            </View>
            <Text style={[s.timeLabel, { color: theme.muted, fontFamily: FONTS.mono }]}>00:16 / {exercise.videoDuration}</Text>
            <View style={[s.speedPill, { backgroundColor: theme.surface2 }]}>
              <Text style={[s.speedTxt, { color: theme.fg, fontFamily: FONTS.mono }]}>1x</Text>
            </View>
          </View>
        </View>

        <View style={s.content}>
          <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>
            {exercise.category.toUpperCase()} · {exercise.pattern.toUpperCase()} · {diffMap[exercise.difficulty]}
          </Text>
          <Text style={[s.title, { color: theme.fg, fontFamily: FONTS.display }]}>{exercise.name}</Text>

          <View style={s.statsRow}>
            {[
              { label: 'MÚSCULO', value: exercise.muscles[0]?.name ?? '—' },
              { label: 'EQUIPO', value: exercise.equipment },
              { label: 'PLANO', value: exercise.plane },
              { label: 'PATRÓN', value: exercise.pattern },
            ].map((stat, i) => (
              <View key={i} style={[s.statCard, { backgroundColor: theme.surface, borderColor: theme.line }]}>
                <Text style={[s.statLabel, { color: theme.muted, fontFamily: FONTS.mono }]}>{stat.label}</Text>
                <Text style={[s.statVal, { color: theme.fg, fontFamily: FONTS.semiBold }]}>{stat.value}</Text>
              </View>
            ))}
          </View>

          <View style={[s.muscleCard, { backgroundColor: theme.surface, borderColor: theme.line }]}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Svg width={58} height={100} viewBox="0 0 58 100" fill="none">
                <Circle cx={29} cy={12} r={10} stroke={theme.fg2} strokeWidth={1} fill="none"/>
                <Path d="M15 28 L43 28" stroke={theme.fg2} strokeWidth={1} strokeOpacity={0.5}/>
                <Path d="M29 22 L29 60" stroke={theme.fg2} strokeWidth={1} strokeOpacity={0.5}/>
                <Path d="M15 28 L10 46" stroke={theme.fg2} strokeWidth={1} strokeOpacity={0.5}/>
                <Path d="M43 28 L48 46" stroke={theme.fg2} strokeWidth={1} strokeOpacity={0.5}/>
                <Path d="M22 60 L18 90" stroke={theme.accent} strokeWidth={3} strokeOpacity={0.7}/>
                <Path d="M36 60 L40 90" stroke={theme.accent} strokeWidth={3} strokeOpacity={0.7}/>
              </Svg>
              <View style={{ flex: 1, paddingLeft: 14 }}>
                {exercise.muscles.map((m, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={[{ width: 120, fontSize: 11, color: theme.fg2, fontFamily: FONTS.medium }]}>{m.name}</Text>
                    <View style={[{ flex: 1, height: 4, borderRadius: 99, backgroundColor: theme.surface2, overflow: 'hidden' }]}>
                      <View style={[{ height: '100%', borderRadius: 99, backgroundColor: theme.accent, width: `${m.percentage}%` as any }]}/>
                    </View>
                    <Text style={[{ width: 36, textAlign: 'right', fontSize: 10, color: theme.muted, fontFamily: FONTS.mono }]}>{m.percentage}%</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <Text style={[s.sectionTitle, { color: theme.fg, fontFamily: FONTS.display }]}>Indicaciones del coach</Text>
          {exercise.coachNotes.map((note, i) => (
            <View key={i} style={[s.noteRow, { borderBottomColor: theme.line }]}>
              <Text style={[s.noteNum, { color: theme.accent, fontFamily: FONTS.mono }]}>{String(i+1).padStart(2,'0')}</Text>
              <Text style={[s.noteTxt, { color: theme.fg2, fontFamily: FONTS.medium }]}>{note}</Text>
            </View>
          ))}

          <View style={s.ctaRow}>
            <TouchableOpacity style={[s.ghostCircle, { borderColor: theme.line2 }]}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke={theme.fg} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
                <Circle cx={12} cy={13} r={4} stroke={theme.fg} strokeWidth={1.6}/>
              </Svg>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.trainBtn, { backgroundColor: theme.accent }]}
              onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); navigation.navigate('Workout' as any); }}
              activeOpacity={0.85}
            >
              <Svg width={18} height={18} viewBox="0 0 24 24" fill={theme.accentInk}><Path d="M5 3l14 9-14 9V3z" fill={theme.accentInk}/></Svg>
              <Text style={[s.trainTxt, { color: theme.accentInk, fontFamily: FONTS.bold }]}>ENTRENAR AHORA</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 40 }}/>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  videoHeader: { height: VIDEO_H, overflow: 'hidden' },
  videoTopBar: { position: 'absolute', top: 52, left: SCREEN_PADDING, right: SCREEN_PADDING, flexDirection: 'row', alignItems: 'center' },
  circleBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)' },
  iaBadge: { position: 'absolute', top: 100, left: SCREEN_PADDING, flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99, borderWidth: 1 },
  recDot: { width: 6, height: 6, borderRadius: 3 },
  iaTxt: { fontSize: 10, letterSpacing: 0.8 },
  anglePill: { position: 'absolute', top: 140, right: SCREEN_PADDING, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99, borderWidth: 1 },
  angleTxt: { fontSize: 10, letterSpacing: 0.5 },
  playerControls: { position: 'absolute', bottom: 12, left: SCREEN_PADDING, right: SCREEN_PADDING, flexDirection: 'row', alignItems: 'center', gap: 10 },
  playBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  progressTrack: { flex: 1, height: 3, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.12)', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 99 },
  timeLabel: { fontSize: 10 },
  speedPill: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  speedTxt: { fontSize: 11 },
  content: { paddingHorizontal: SCREEN_PADDING, paddingTop: 20 },
  eyebrow: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.6, marginBottom: 6 },
  title: { fontSize: 30, lineHeight: 28, letterSpacing: -1, marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 6, marginBottom: 16 },
  statCard: { flex: 1, padding: 8, borderRadius: 10, borderWidth: 1 },
  statLabel: { fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 3 },
  statVal: { fontSize: 11 },
  muscleCard: { borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 20 },
  sectionTitle: { fontSize: 18, lineHeight: 20, letterSpacing: -0.4, marginBottom: 12 },
  noteRow: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, gap: 12 },
  noteNum: { fontSize: 11, width: 24, marginTop: 1 },
  noteTxt: { flex: 1, fontSize: 13, lineHeight: 19 },
  ctaRow: { flexDirection: 'row', gap: 10, marginTop: 24, alignItems: 'center' },
  ghostCircle: { width: 56, height: 56, borderRadius: 28, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  trainBtn: { flex: 1, height: 56, borderRadius: 99, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  trainTxt: { fontSize: 15, letterSpacing: 0.3 },
});
