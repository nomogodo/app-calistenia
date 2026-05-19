import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';
import { TabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import LibraryScreen from '../screens/LibraryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useTheme } from '../hooks/useTheme';
import { FONTS } from '../constants/typography';

const Tab = createBottomTabNavigator<TabParamList>();

function HomeIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M9 22V12h6v10" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

function DumbbellIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

function LibraryIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M3 6h4v14H3zM10 3h4v17h-4zM18 8h3v9h-3z" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

function ChatIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

function UserIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.6}/>
      <Path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
    </Svg>
  );
}

function CustomTabBar({ state, navigation }: any) {
  const theme = useTheme();
  const icons = [HomeIcon, LibraryIcon, DumbbellIcon, ChatIcon, UserIcon];
  const labels = ['HOY', 'EJERCICIOS', 'ENTRENAR', 'COACH', 'TÚ'];

  return (
    <View style={[styles.tabBar, { backgroundColor: theme.bg, borderTopColor: theme.line }]}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const Icon = icons[index];
        const color = isFocused ? theme.fg : theme.dim;
        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={() => {
              const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
            }}
            activeOpacity={0.7}
          >
            <Icon color={color} />
            {isFocused && <View style={[styles.dot, { backgroundColor: theme.accent }]} />}
            <Text style={[styles.label, { color, fontFamily: FONTS.mono }]}>{labels[index]}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function EmptyScreen() { return null; }

export default function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(p) => <CustomTabBar {...p} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen
        name="Train"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => { e.preventDefault(); navigation.navigate('Workout'); },
        })}
      />
      <Tab.Screen
        name="Coach"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => { e.preventDefault(); navigation.navigate('Chat'); },
        })}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 18,
    paddingBottom: 30,
    borderTopWidth: 1,
    height: 92,
  },
  tabItem: { flex: 1, alignItems: 'center', gap: 2 },
  dot: { width: 4, height: 4, borderRadius: 2, marginTop: -2 },
  label: { fontSize: 9, letterSpacing: 1.2, textTransform: 'uppercase' },
});
