import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Line, Circle, Text as SvgText } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const CATEGORIES = ['Calistenia', 'Fuerza', 'Movilidad', 'Resistencia'];

const SKILLS = [
  { id: 'pushup', t: 'Flexiones', l: 1, x: 15, y: 80, done: true, parents: [] as string[] },
  { id: 'pullup', t: 'Dominadas', l: 1, x: 50, y: 80, done: true, parents: [] as string[] },
  { id: 'squat', t: 'Sentadilla', l: 1, x: 85, y: 80, done: true, parents: [] as string[] },
  { id: 'dip', t: 'Fondos', l: 2, x: 15, y: 190, done: true, parents: ['pushup'] },
  { id: 'l-sit', t: 'L-Sit', l: 2, x: 35, y: 190, done: true, parents: ['pushup'] },
  { id: 'mu-neg', t: 'MU Neg.', l: 2, x: 60, y: 190, done: true, parents: ['pullup'] },
  { id: 'pistol', t: 'Pistol SQ', l: 2, x: 85, y: 190, done: false, parents: ['squat'] },
  { id: 'mu', t: 'Muscle-up', l: 3, x: 35, y: 300, done: false, parents: ['dip', 'mu-neg'] },
  { id: 'fl-tuck', t: 'FL Tuck', l: 3, x: 65, y: 300, done: false, parents: ['pullup'] },
  { id: 'fl', t: 'Front Lever', l: 4, x: 50, y: 400, done: false, parents: ['mu', 'fl-tuck'] },
  { id: 'planche', t: 'Planche Tk', l: 4, x: 20, y: 400, done: false, parents: ['mu'] },
];

export function SkillTreeScreen({ navigation }: any) {
  const colors = useTheme();
  const [cat, setCat] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const selectedSkill = SKILLS.find((s) => s.id === selected);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Header */}
      <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.sm, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 36, height: 36, borderRadius: 99,
            backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ color: colors.fg }}>{'←'}</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={[TYPOGRAPHY.eyebrow, { color: colors.muted }]}>BIBLIOTECA {'·'} HABILIDADES</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 2, color: colors.fg }}>
            {'Árbol de habilidades'}
          </Text>
        </View>
      </View>

      {/* Category filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, gap: 6, flexDirection: 'row' }}
      >
        {CATEGORIES.map((c, i) => (
          <TouchableOpacity
            key={c}
            onPress={() => setCat(i)}
            style={{
              paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99,
              backgroundColor: cat === i ? colors.accent : colors.surface,
              borderWidth: 1, borderColor: cat === i ? colors.accent : colors.line,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: '600', color: cat === i ? colors.accentInk : colors.fg }}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Skill tree SVG canvas */}
        <View style={{ height: 500, marginHorizontal: SPACING.md, marginTop: SPACING.md, borderRadius: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, overflow: 'hidden' }}>
          <Svg width="100%" height={500}>
            {/* Lines between nodes */}
            {SKILLS.flatMap((skill) =>
              skill.parents.map((parentId) => {
                const parent = SKILLS.find((s) => s.id === parentId);
                if (!parent) return null;
                return (
                  <Line
                    key={`${parentId}-${skill.id}`}
                    x1={`${parent.x}%`} y1={parent.y + 22}
                    x2={`${skill.x}%`} y2={skill.y - 22}
                    stroke={skill.done ? colors.accent : colors.line2}
                    strokeWidth={1.5}
                    strokeDasharray={skill.done ? undefined : '4 3'}
                    opacity={0.6}
                  />
                );
              })
            )}

            {/* Skill nodes */}
            {SKILLS.map((skill) => (
              <React.Fragment key={skill.id}>
                <Circle
                  cx={`${skill.x}%`} cy={skill.y}
                  r={20}
                  fill={skill.done ? colors.accent : colors.bg}
                  stroke={selected === skill.id ? colors.accent : skill.done ? colors.accent : colors.line2}
                  strokeWidth={selected === skill.id ? 2.5 : 1.5}
                  onPress={() => setSelected(skill.id === selected ? null : skill.id)}
                />
                <SvgText
                  x={`${skill.x}%`} y={skill.y + 4}
                  textAnchor="middle"
                  fontSize={8}
                  fill={skill.done ? colors.accentInk : colors.fg2}
                  fontWeight="700"
                  onPress={() => setSelected(skill.id === selected ? null : skill.id)}
                >
                  {skill.t.length > 8 ? skill.t.slice(0, 7) + '…' : skill.t}
                </SvgText>
              </React.Fragment>
            ))}
          </Svg>
        </View>

        {/* Legend */}
        <View style={{ paddingHorizontal: SPACING.md, paddingTop: SPACING.md, paddingBottom: SPACING.md }}>
          <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center', marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 14, height: 14, borderRadius: 99, backgroundColor: colors.accent }} />
              <Text style={{ fontSize: 11, color: colors.fg2 }}>Desbloqueado</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 14, height: 14, borderRadius: 99, backgroundColor: colors.bg, borderWidth: 1.5, borderColor: colors.line2 }} />
              <Text style={{ fontSize: 11, color: colors.fg2 }}>Bloqueado</Text>
            </View>
          </View>

          {selectedSkill && (
            <View
              style={{
                padding: 16, borderRadius: 14,
                backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.accent,
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View>
                  <Text style={[TYPOGRAPHY.eyebrow, { color: colors.accent }]}>NIVEL {selectedSkill.l}</Text>
                  <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 4, color: colors.fg }}>{selectedSkill.t}</Text>
                </View>
                {selectedSkill.done && (
                  <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, backgroundColor: colors.accent }}>
                    <Text style={[TYPOGRAPHY.mono, { fontSize: 9, color: colors.accentInk, fontWeight: '700' }]}>LOGRADO</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity
                style={{
                  marginTop: 12, height: 44, borderRadius: 10, backgroundColor: colors.accent,
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: '700', color: colors.accentInk }}>VER PROGRESIONES</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
