import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  InterTight_800ExtraBold,
  InterTight_700Bold,
  InterTight_600SemiBold,
  InterTight_500Medium,
} from '@expo-google-fonts/inter-tight';
import {
  JetBrainsMono_500Medium,
  JetBrainsMono_600SemiBold,
} from '@expo-google-fonts/jetbrains-mono';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import RootNavigator from './src/navigation';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'InterTight-ExtraBold': InterTight_800ExtraBold,
    'InterTight-Bold': InterTight_700Bold,
    'InterTight-SemiBold': InterTight_600SemiBold,
    'InterTight-Medium': InterTight_500Medium,
    'JetBrainsMono-Medium': JetBrainsMono_500Medium,
    'JetBrainsMono-SemiBold': JetBrainsMono_600SemiBold,
  });

  // useEffect is more reliable than onLayout on web — the splash overlay
  // can block DOM events, causing onLayout to never fire.
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#08090A' }}>
        <StatusBar style="light" />
        <RootNavigator />
      </View>
    </SafeAreaProvider>
  );
}
