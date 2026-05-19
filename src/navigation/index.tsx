import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppStore } from '../store/useAppStore';
import { RootStackParamList } from './types';
import TabNavigator from './TabNavigator';

// Onboarding (default exports)
import SplashScreen from '../screens/onboarding/SplashScreen';
import ProfileBasicsScreen from '../screens/onboarding/ProfileBasicsScreen';
import FitnessTestScreen from '../screens/onboarding/FitnessTestScreen';
import EquipmentScreen from '../screens/onboarding/EquipmentScreen';
import InjuriesScreen from '../screens/onboarding/InjuriesScreen';
import DietaryScreen from '../screens/onboarding/DietaryScreen';
import PaywallScreen from '../screens/onboarding/PaywallScreen';

// Workout (named exports)
import { WorkoutHubScreen } from '../screens/workout/WorkoutHubScreen';
import { RoutinePreviewScreen } from '../screens/workout/RoutinePreviewScreen';
import { RestTimerScreen } from '../screens/workout/RestTimerScreen';
import { ExerciseReplacerScreen } from '../screens/workout/ExerciseReplacerScreen';
import { WorkoutSummaryScreen } from '../screens/workout/WorkoutSummaryScreen';

// Shared screens (existing)
import WorkoutScreen from '../screens/WorkoutScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';

// Library
import { SkillTreeScreen } from '../screens/library/SkillTreeScreen';

// Coach
import ChatScreen from '../screens/ChatScreen';
import { FormCheckerScreen } from '../screens/coach/FormCheckerScreen';
import { AudioCoachScreen } from '../screens/coach/AudioCoachScreen';

// Nutrition
import { NutritionDashboardScreen } from '../screens/nutrition/NutritionDashboardScreen';
import { MealDetailScreen } from '../screens/nutrition/MealDetailScreen';
import { MealSwapperScreen } from '../screens/nutrition/MealSwapperScreen';
import { FoodScannerScreen } from '../screens/nutrition/FoodScannerScreen';
import { GroceryListScreen } from '../screens/nutrition/GroceryListScreen';

// Progress
import { ProgressHubScreen } from '../screens/progress/ProgressHubScreen';
import { BodyPhotosScreen } from '../screens/progress/BodyPhotosScreen';
import { BiometricsScreen } from '../screens/progress/BiometricsScreen';
import { PRLogScreen } from '../screens/progress/PRLogScreen';

// Profile
import { UserProfileScreen } from '../screens/profile/UserProfileScreen';
import { LeaderboardScreen } from '../screens/profile/LeaderboardScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';

// Ranks
import { RankHubScreen } from '../screens/ranks/RankHubScreen';
import { LeagueScreen } from '../screens/ranks/LeagueScreen';
import { HeadToHeadScreen } from '../screens/ranks/HeadToHeadScreen';
import { SeasonPassScreen } from '../screens/ranks/SeasonPassScreen';
import { RankTierScreen } from '../screens/ranks/RankTierScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isOnboarded } = useAppStore();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        {!isOnboarded ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="OnboardingBasics" component={ProfileBasicsScreen} />
            <Stack.Screen name="OnboardingFitness" component={FitnessTestScreen} />
            <Stack.Screen name="OnboardingEquipment" component={EquipmentScreen} />
            <Stack.Screen name="OnboardingInjuries" component={InjuriesScreen} />
            <Stack.Screen name="OnboardingDietary" component={DietaryScreen} />
            <Stack.Screen name="OnboardingPaywall" component={PaywallScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />

            {/* Workout */}
            <Stack.Screen name="WorkoutHub" component={WorkoutHubScreen} />
            <Stack.Screen name="RoutinePreview" component={RoutinePreviewScreen} />
            <Stack.Screen name="ActiveWorkout" component={WorkoutScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="RestTimer" component={RestTimerScreen} />
            <Stack.Screen name="ExerciseReplacer" component={ExerciseReplacerScreen} options={{ presentation: 'transparentModal', animation: 'fade' }} />
            <Stack.Screen name="WorkoutSummary" component={WorkoutSummaryScreen} />

            {/* Shared */}
            <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
            <Stack.Screen name="SkillTree" component={SkillTreeScreen} />

            {/* Coach */}
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="FormChecker" component={FormCheckerScreen} />
            <Stack.Screen name="AudioCoach" component={AudioCoachScreen} />

            {/* Nutrition */}
            <Stack.Screen name="NutritionDashboard" component={NutritionDashboardScreen} />
            <Stack.Screen name="MealDetail" component={MealDetailScreen} />
            <Stack.Screen name="MealSwapper" component={MealSwapperScreen} />
            <Stack.Screen name="FoodScanner" component={FoodScannerScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="GroceryList" component={GroceryListScreen} />

            {/* Progress */}
            <Stack.Screen name="ProgressHub" component={ProgressHubScreen} />
            <Stack.Screen name="BodyPhotos" component={BodyPhotosScreen} />
            <Stack.Screen name="Biometrics" component={BiometricsScreen} />
            <Stack.Screen name="PRLog" component={PRLogScreen} />

            {/* Profile */}
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />

            {/* Ranks */}
            <Stack.Screen name="RankHub" component={RankHubScreen} />
            <Stack.Screen name="League" component={LeagueScreen} />
            <Stack.Screen name="HeadToHead" component={HeadToHeadScreen} />
            <Stack.Screen name="SeasonPass" component={SeasonPassScreen} />
            <Stack.Screen name="RankTier" component={RankTierScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
