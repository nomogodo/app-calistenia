import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
  KeyboardAvoidingView, Platform, SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Svg, Path, Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../hooks/useTheme';
import { FONTS } from '../constants/typography';
import { SCREEN_PADDING } from '../constants/spacing';
import { ChatMessage, PlanLine } from '../types';
import { sendMessageToCoach } from '../services/ai/claude';
import { speakCoach } from '../services/tts/speech';

const QUICK_SUGGESTIONS = [
  'Ajusta mi dieta',
  '¿Cómo subir peso muerto?',
  'Plan de descanso',
  'Tengo agujetas',
];

function TypingIndicator({ accent }: { accent: string }) {
  return (
    <View style={[ti.bubble, { backgroundColor: '#15181B', borderColor: 'rgba(255,255,255,0.08)' }]}>
      {[0, 1, 2].map((i) => (
        <View key={i} style={[ti.dot, { backgroundColor: accent }]} />
      ))}
    </View>
  );
}
const ti = StyleSheet.create({
  bubble: { flexDirection: 'row', gap: 4, padding: 12, borderRadius: 16, borderWidth: 1, alignSelf: 'flex-start', marginBottom: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, opacity: 0.7 },
});

function PlanCard({ plan, accent, accentInk, surface, line }: { plan: PlanLine[]; accent: string; accentInk: string; surface: string; line: string }) {
  return (
    <View style={[pc.card, { backgroundColor: surface, borderColor: line }]}>
      <View style={pc.headerRow}>
        <View style={[pc.dot, { backgroundColor: accent }]} />
        <Text style={[pc.title, { color: accent, fontFamily: FONTS.mono }]}>PLAN AJUSTADO</Text>
      </View>
      {plan.map((line, i) => (
        <View key={i} style={pc.planLine}>
          <Text style={[pc.lineNum, { color: 'rgba(245,245,242,0.32)', fontFamily: FONTS.mono }]}>{line.number}</Text>
          <Text style={[pc.lineName, { color: '#F5F5F2', fontFamily: FONTS.medium }]}>{line.name}</Text>
          {line.changed && (
            <View style={[pc.changeBadge, { backgroundColor: `${accent}20` }]}>
              <Text style={[pc.changeTxt, { color: accent, fontFamily: FONTS.mono }]}>cambio</Text>
            </View>
          )}
          <Text style={[pc.lineSets, { color: 'rgba(245,245,242,0.50)', fontFamily: FONTS.mono }]}>{line.sets}</Text>
        </View>
      ))}
      <TouchableOpacity style={[pc.acceptBtn, { backgroundColor: accent }]}>
        <Text style={[pc.acceptTxt, { color: accentInk, fontFamily: FONTS.bold }]}>ACEPTAR PLAN</Text>
      </TouchableOpacity>
    </View>
  );
}
const pc = StyleSheet.create({
  card: { borderRadius: 12, borderWidth: 1, padding: 12, marginTop: 8 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  title: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.2 },
  planLine: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, gap: 6 },
  lineNum: { fontSize: 11, width: 24 },
  lineName: { flex: 1, fontSize: 12 },
  changeBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  changeTxt: { fontSize: 9, textTransform: 'uppercase' },
  lineSets: { fontSize: 11 },
  acceptBtn: { height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  acceptTxt: { fontSize: 12, letterSpacing: 0.3 },
});

function CoachBubble({ message, theme }: { message: ChatMessage; theme: any }) {
  return (
    <View style={cb.wrap}>
      <Text style={[cb.label, { color: theme.muted, fontFamily: FONTS.mono }]}>COACH</Text>
      <View style={[cb.bubble, { backgroundColor: theme.surface, borderColor: theme.line }]}>
        <Text style={[cb.text, { color: theme.fg2, fontFamily: FONTS.medium }]}>{message.text}</Text>
        {message.options && message.options.map((opt, i) => (
          <TouchableOpacity key={i} style={[cb.optBtn, { backgroundColor: theme.bg2, borderColor: theme.accent }]}>
            <Text style={[cb.optTxt, { color: theme.fg, fontFamily: FONTS.medium }]}>{opt}</Text>
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
              <Path d="M9 18l6-6-6-6" stroke={theme.accent} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </TouchableOpacity>
        ))}
        {message.plan && (
          <PlanCard
            plan={message.plan}
            accent={theme.accent}
            accentInk={theme.accentInk}
            surface={theme.bg2}
            line={theme.line2}
          />
        )}
      </View>
    </View>
  );
}
const cb = StyleSheet.create({
  wrap: { alignItems: 'flex-start', maxWidth: '85%', marginBottom: 12 },
  label: { fontSize: 9, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 3 },
  bubble: { padding: 14, borderRadius: 16, borderWidth: 1, borderBottomLeftRadius: 4 },
  text: { fontSize: 13.5, lineHeight: 20 },
  optBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderRadius: 10, borderWidth: 1, marginTop: 6 },
  optTxt: { fontSize: 13, flex: 1 },
});

function UserBubble({ message, theme }: { message: ChatMessage; theme: any }) {
  return (
    <View style={ub.wrap}>
      <View style={[ub.bubble, { backgroundColor: theme.accent }]}>
        <Text style={[ub.text, { color: theme.accentInk, fontFamily: FONTS.medium }]}>{message.text}</Text>
      </View>
    </View>
  );
}
const ub = StyleSheet.create({
  wrap: { alignItems: 'flex-end', maxWidth: '75%', alignSelf: 'flex-end', marginBottom: 12 },
  bubble: { padding: 12, paddingHorizontal: 14, borderRadius: 16, borderBottomRightRadius: 4 },
  text: { fontSize: 13 },
});

export default function ChatScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { coachMessages, addChatMessage, isCoachTyping, setCoachTyping, user, todayWorkout } = useAppStore();
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [coachMessages, isCoachTyping]);

  const handleSend = async (text?: string) => {
    const msgText = text ?? inputText.trim();
    if (!msgText) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setInputText('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: msgText,
      timestamp: new Date(),
    };
    addChatMessage(userMsg);
    setCoachTyping(true);

    try {
      const response = await sendMessageToCoach(coachMessages, msgText, {
        userName: user.name,
        goal: user.goal,
        workoutName: todayWorkout.name,
      });
      const coachMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'coach',
        text: response,
        timestamp: new Date(),
      };
      addChatMessage(coachMsg);
      speakCoach(response);
    } catch {
      addChatMessage({
        id: (Date.now() + 1).toString(),
        role: 'coach',
        text: 'Error de conexión. Comprueba tu API key en .env.',
        timestamp: new Date(),
      });
    } finally {
      setCoachTyping(false);
    }
  };

  return (
    <SafeAreaView style={[s.container, { backgroundColor: theme.bg }]}>
      {/* Header */}
      <View style={[s.header, { borderBottomColor: theme.line }]}>
        <TouchableOpacity style={[s.headerBtn, { backgroundColor: theme.surface2 }]} onPress={() => navigation.goBack()}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path d="M15 18l-6-6 6-6" stroke={theme.fg} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>
        <View style={[s.coachAvatar, { backgroundColor: theme.surface2, borderColor: theme.accent }]}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path d="M12 2l2.4 7.4H22l-6.4 4.6 2.4 7.4L12 17l-6 4.4 2.4-7.4L2 9.4h7.6L12 2z" stroke={theme.accent} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
          <View style={[s.onlineDot, { backgroundColor: theme.positive, borderColor: theme.bg }]} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[s.coachName, { color: theme.fg, fontFamily: FONTS.semiBold }]}>FORGE Coach</Text>
          <View style={s.statusRow}>
            <View style={[s.statusDot, { backgroundColor: theme.accent }]} />
            <Text style={[s.statusTxt, { color: theme.accent, fontFamily: FONTS.mono }]}>EN LÍNEA · MODO INTENSO</Text>
          </View>
        </View>
        <TouchableOpacity style={[s.headerBtn, { backgroundColor: theme.surface2 }]}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke={theme.fg} strokeWidth={1.6}/>
            <Path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke={theme.fg} strokeWidth={1.6}/>
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={0}>
        <ScrollView
          ref={scrollRef}
          style={s.messages}
          contentContainerStyle={s.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={s.datePill}>
            <Text style={[s.dateTxt, { color: theme.muted, fontFamily: FONTS.mono }]}>HOY · 18:42</Text>
          </View>
          {coachMessages.map((msg) =>
            msg.role === 'coach'
              ? <CoachBubble key={msg.id} message={msg} theme={theme} />
              : <UserBubble key={msg.id} message={msg} theme={theme} />
          )}
          {isCoachTyping && <TypingIndicator accent={theme.accent} />}
          <View style={{ height: 12 }} />
        </ScrollView>

        {/* Composer */}
        <View style={[s.composer, { borderTopColor: theme.line, backgroundColor: theme.bg }]}>
          <View style={[s.inputWrap, { backgroundColor: theme.surface, borderColor: theme.line }]}>
            <TouchableOpacity style={s.attachBtn}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path d="M12 5v14M5 12h14" stroke={theme.fg2} strokeWidth={1.6} strokeLinecap="round"/>
              </Svg>
            </TouchableOpacity>
            <TextInput
              style={[s.input, { color: theme.fg, fontFamily: FONTS.medium }]}
              placeholder="Pregunta lo que sea al coach…"
              placeholderTextColor={theme.muted}
              value={inputText}
              onChangeText={setInputText}
              multiline
              onSubmitEditing={() => handleSend()}
            />
            <TouchableOpacity
              style={[s.micBtn, { backgroundColor: theme.accent }]}
              onPress={() => handleSend()}
            >
              <Svg width={18} height={18} viewBox="0 0 24 24" fill={theme.accentInk}>
                {inputText.trim()
                  ? <Path d="M5 3l14 9-14 9V3z" fill={theme.accentInk}/>
                  : <Path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke={theme.accentInk} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
                }
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Quick suggestions */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.suggestions} contentContainerStyle={s.suggestionsContent}>
            {QUICK_SUGGESTIONS.map((sug) => (
              <TouchableOpacity
                key={sug}
                style={[s.sugChip, { backgroundColor: theme.surface2, borderColor: theme.line }]}
                onPress={() => handleSend(sug)}
              >
                <Text style={[s.sugTxt, { color: theme.fg2, fontFamily: FONTS.medium }]}>{sug}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: SCREEN_PADDING, paddingVertical: 12, borderBottomWidth: 1,
  },
  headerBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  coachAvatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: 5, borderWidth: 2 },
  coachName: { fontSize: 14 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusTxt: { fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.8 },
  messages: { flex: 1 },
  messagesContent: { padding: SCREEN_PADDING, paddingBottom: 8 },
  datePill: { alignSelf: 'center', marginBottom: 16 },
  dateTxt: { fontSize: 9, textTransform: 'uppercase', letterSpacing: 1.2 },
  composer: { paddingHorizontal: SCREEN_PADDING, paddingTop: 12, paddingBottom: 30, borderTopWidth: 1 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderRadius: 99, borderWidth: 1, paddingHorizontal: 6, paddingVertical: 4,
  },
  attachBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, fontSize: 14, maxHeight: 80, paddingVertical: 8 },
  micBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  suggestions: { marginTop: 10 },
  suggestionsContent: { gap: 8 },
  sugChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 99, borderWidth: 1 },
  sugTxt: { fontSize: 13 },
});
