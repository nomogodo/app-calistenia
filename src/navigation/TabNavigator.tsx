import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Svg, Path, Circle } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { FONTS } from '../constants/typography';
import { TAB_BAR_HEIGHT } from '../constants/spacing';
import { TabParamList, RootStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import LibraryScreen from '../screens/LibraryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<TabParamList>();
type Nav = NativeStackNavigationProp<RootStackParamList>;

function TabIcon({ name, color }: { name: string; color: string }) {
  const icons: Record<string, React.ReactNode> = {
    home: <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/><Path d="M9 21V12h6v9" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/></Svg>,
    library: <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Path d="M4 19V6a2 2 0 012-2h12a2 2 0 012 2v13" stroke={color} strokeWidth={1.6} strokeLinecap="round"/><Path d="M4 19h16" stroke={color} strokeWidth={1.6} strokeLinecap="round"/><Path d="M9 8h6M9 12h4" stroke={color} strokeWidth={1.6} strokeLinecap="round"/></Svg>,
    dumbbell: <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Path d="M6 5H4a1 1 0 00-1 1v12a1 1 0 001 1h2M18 5h2a1 1 0 011 1v12a1 1 0 01-1 1h-2" stroke={color} strokeWidth={1.6} strokeLinecap="round"/><Path d="M6 8h12v8H6z" stroke={color} strokeWidth={1.6} strokeLinejoin="round"/></Svg>,
    chat: <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/></Svg>,
    user: <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.6}/><Path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke={color} strokeWidth={1.6} strokeLinecap="round"/></Svg>,
  };
  return <>{icons[name] || icons.home}</>;
}

function CustomTabBar({ state, navigation }: any) {
  const theme = useTheme();
  const rootNav = useNavigation<Nav>();
  const labels = ['HOY', 'EJERCICIOS', 'ENTRENAR', 'COACH', 'TÚ'];
  const icons = ['home', 'library', 'dumbbell', 'chat', 'user'];

  return (
    <View style={[s.bar, { backgroundColor: theme.bg, borderTopColor: theme.line }]}>
      {state.routes.map((route: any, i: number) => {
        const focused = state.index === i;
        const color = focused ? theme.fg : theme.dim;
        const onPress = () => {
          if (route.name === 'Train') { rootNav.navigate('WorkoutHub'); return; }
          if (route.name === 'Coach') { rootNav.navigate('Chat'); return; }
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
        };
        return (
          <TouchableOpacity key={route.key} style={s.item} onPress={onPress} activeOpacity={0.7}>
            <TabIcon name={icons[i]} color={color} />
            {focused && <View style={[s.dot, { backgroundColor: theme.accent }]} />}
            <Text style={[s.label, { color, fontFamily: FONTS.mono }]}>{labels[i]}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Train" component={HomeScreen} />
      <Tab.Screen name="Coach" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const s = StyleSheet.create({
  bar: { height: TAB_BAR_HEIGHT, flexDirection: 'row', borderTopWidth: 1, paddingTop: 10, paddingBottom: 30, paddingHorizontal: 8 },
  item: { flex: 1, alignItems: 'center', gap: 3 },
  dot: { width: 4, height: 4, borderRadius: 2 },
  label: { fontSize: 9, textTransform: 'uppercase', letterSpacing: 1.4 },
});
