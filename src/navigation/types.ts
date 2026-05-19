import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: NavigatorScreenParams<TabParamList>;
  Workout: undefined;
  ExerciseDetail: { exerciseId: string };
  Chat: undefined;
};

export type TabParamList = {
  Home: undefined;
  Library: undefined;
  Train: undefined;
  Coach: undefined;
  Profile: undefined;
};
