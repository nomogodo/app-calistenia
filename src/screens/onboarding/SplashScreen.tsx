import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';
import { FONTS } from '../../constants/typography';
import { SCREEN_PADDING } from '../../constants/spacing';
import { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function SplashScreen() {
  const theme = useTheme();
  const nav = useNavigation<Nav>();
  return (
    <SafeAreaView style={[s.container, { backgroundColor: theme.bg }]}>
      <View style={s.hero}>
        <View style={[s.halo, { backgroundColor: `${theme.accent}22` }]} />
        <Text style={[s.eyebrow, { color: theme.muted, fontFamily: FONTS.mono }]}>FORGE · 2026</Text>
        <Text style={[s.headline, { color: theme.fg, fontFamily: FONTS.display }]}>
          Suficiente{'
'}de excusas.
        </Text>
        <Text style={[s.sub, { color: theme.fg2, fontFamily: FONTS.medium }]}>
          Tu coach personal con IA. Rutinas adaptativas, dieta calculada, corrección de técnica en vivo.
        </Text>
      </View>
      <View style={s.authBlock}>
        <TouchableOpacity style={[s.btn, { backgroundColor: theme.fg }]} onPress={() => nav.navigate('OnboardingBasics')}>
          <Svg width={16} height={16} viewBox="0 0 16 16"><Path d="M12.5 8.5c0-2.5 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-2-.9-3.2-.8-1.6 0-3.1.9-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3.1 2.4 1.2-.1 1.7-.8 3.2-.8s1.9.8 3.2.7c1.3 0 2.2-1.2 3-2.4.9-1.3 1.3-2.7 1.3-2.8-.1 0-2.7-1-2.7-3.8z" fill={theme.bg}/></Svg>
          <Text style={[s.btnTxt, { color: theme.bg, fontFamily: FONTS.bold }]}>Continuar con Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.btn, { backgroundColor: theme.surface2, borderColor: theme.line2, borderWidth: 1 }]} onPress={() => nav.navigate('OnboardingBasics')}>
          <Text style={[s.btnTxt, { color: theme.fg, fontFamily: FONTS.bold }]}>Continuar con Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.btnGhost, { borderColor: theme.line2 }]} onPress={() => nav.navigate('OnboardingBasics')}>
          <Text style={[s.btnTxt, { color: theme.fg2, fontFamily: FONTS.medium }]}>Continuar con email</Text>
        </TouchableOpacity>
        <Text style={[s.loginLink, { color: theme.muted, fontFamily: FONTS.medium }]}>
          ¿Ya tienes cuenta?{' '}
          <Text style={{ color: theme.accent }}>Iniciar sesión</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  hero: { flex: 1, paddingHorizontal: SCREEN_PADDING, justifyContent: 'center' },
  halo: { position: 'absolute', top: 0, left: 0, right: 0, height: '55%', borderBottomLeftRadius: 999, borderBottomRightRadius: 999 },
  eyebrow: { fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', marginBottom: 16 },
  headline: { fontSize: 64, lineHeight: 60, letterSpacing: -2, marginBottom: 18 },
  sub: { fontSize: 16, lineHeight: 24, maxWidth: 280 },
  authBlock: { paddingHorizontal: SCREEN_PADDING, paddingBottom: 40, gap: 10 },
  btn: { height: 56, borderRadius: 99, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  btnGhost: { height: 56, borderRadius: 99, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  btnTxt: { fontSize: 15, letterSpacing: 0.3 },
  loginLink: { fontSize: 12, textAlign: 'center', marginTop: 8 },
});
