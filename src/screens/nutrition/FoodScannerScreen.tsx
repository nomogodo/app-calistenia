import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';
import { TYPOGRAPHY } from '../../constants/typography';

const { width: SW, height: SH } = Dimensions.get('window');
const MODES = ['PLATO IA', 'CÓDIGO', 'ETIQUETA'];

export function FoodScannerScreen({ navigation }: any) {
  const colors = useTheme();
  const [mode, setMode] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: '#0a0a0a' }}>
      {/* Detection circle overlay */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View
          style={{
            position: 'absolute',
            left: SW / 2 - 115,
            top: SH * 0.4 - 115,
            width: 230, height: 230, borderRadius: 115,
            borderWidth: 2, borderColor: colors.accent,
            shadowColor: colors.accent,
            shadowRadius: 20,
            shadowOpacity: 0.5,
          }}
        />
        <Svg
          width={250} height={250}
          style={{
            position: 'absolute',
            left: SW / 2 - 125,
            top: SH * 0.4 - 125,
          }}
        >
          <G stroke={colors.accent} strokeWidth={3} fill="none" strokeLinecap="round">
            <Path d="M5 25 L5 5 L25 5" />
            <Path d="M245 25 L245 5 L225 5" />
            <Path d="M5 225 L5 245 L25 245" />
            <Path d="M245 225 L245 245 L225 245" />
          </G>
        </Svg>
      </View>

      {/* Top bar */}
      <View style={{ position: 'absolute', top: 54, left: 0, right: 0, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 38, height: 38, borderRadius: 99,
            backgroundColor: 'rgba(0,0,0,0.45)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ color: colors.fg, fontSize: 16 }}>✕</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.fg }]}>ESCANEAR COMIDA</Text>
        </View>
        <TouchableOpacity
          style={{
            width: 38, height: 38, borderRadius: 99,
            backgroundColor: 'rgba(0,0,0,0.45)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ color: colors.fg, fontSize: 16 }}>⚡</Text>
        </TouchableOpacity>
      </View>

      {/* Mode switcher */}
      <View
        style={{
          position: 'absolute', top: 130,
          left: SW / 2 - 110,
          flexDirection: 'row', gap: 4, padding: 4, borderRadius: 99,
          backgroundColor: 'rgba(0,0,0,0.6)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
        }}
      >
        {MODES.map((m, i) => (
          <TouchableOpacity
            key={m}
            onPress={() => setMode(i)}
            style={{
              paddingHorizontal: 14, paddingVertical: 6, borderRadius: 99,
              backgroundColor: mode === i ? colors.accent : 'transparent',
            }}
          >
            <Text style={[TYPOGRAPHY.mono, {
              fontSize: 9, letterSpacing: 1, fontWeight: '700',
              color: mode === i ? colors.accentInk : colors.fg2,
            }]}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Detection result */}
      <View
        style={{
          position: 'absolute', bottom: 200, left: 16, right: 16,
          padding: 14, borderRadius: 18,
          backgroundColor: 'rgba(15,17,19,0.85)',
          borderWidth: 1, borderColor: colors.accent,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ color: colors.accent, fontSize: 14 }}>✦</Text>
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.accent }]}>DETECTADO · 96% CONFIANZA</Text>
        </View>
        <Text style={{ marginTop: 10, fontSize: 16, fontWeight: '700', color: colors.fg }}>Pollo con arroz y verduras</Text>
        <View style={{ marginTop: 6, flexDirection: 'row', gap: 14 }}>
          {[{ v: '~750', u: 'kcal' }, { v: '~52', u: 'g P' }, { v: '~92', u: 'g C' }, { v: '~18', u: 'g G' }].map((s, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
              <Text style={[TYPOGRAPHY.mono, { color: colors.fg, fontWeight: '700', fontSize: 12 }]}>{s.v}</Text>
              <Text style={{ fontSize: 11, color: colors.fg2 }}>{s.u}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Capture button */}
      <View
        style={{
          position: 'absolute', bottom: 70, left: 0, right: 0,
          flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 32,
        }}
      >
        <TouchableOpacity
          style={{
            width: 44, height: 44, borderRadius: 99,
            backgroundColor: 'rgba(0,0,0,0.45)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 20 }}>🖼️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 76, height: 76, borderRadius: 38,
            borderWidth: 4, borderColor: colors.accent,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: colors.accent }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 44, height: 44, borderRadius: 99,
            backgroundColor: 'rgba(0,0,0,0.45)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 20 }}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
