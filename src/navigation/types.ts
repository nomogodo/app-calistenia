export type RootStackParamList = {
  Splash: undefined;
  OnboardingBasics: undefined;
  OnboardingFitness: undefined;
  OnboardingEquipment: undefined;
  OnboardingInjuries: undefined;
  OnboardingDietary: undefined;
  OnboardingPaywall: undefined;
  Main: undefined;

  // Workout
  WorkoutHub: undefined;
  RoutinePreview: undefined;
  ActiveWorkout: undefined;
  RestTimer: undefined;
  ExerciseReplacer: { exerciseId?: string };
  WorkoutSummary: undefined;

  // Shared
  ExerciseDetail: { exerciseId: string };
  SkillTree: undefined;

  // Coach
  Chat: undefined;
  FormChecker: undefined;
  AudioCoach: undefined;

  // Nutrition
  NutritionDashboard: undefined;
  MealDetail: { mealId: number };
  MealSwapper: undefined;
  FoodScanner: undefined;
  GroceryList: undefined;

  // Progress
  ProgressHub: undefined;
  BodyPhotos: undefined;
  Biometrics: undefined;
  PRLog: undefined;

  // Profile
  UserProfile: undefined;
  Leaderboard: undefined;
  Settings: undefined;

  // Ranks
  RankHub: undefined;
  League: undefined;
  HeadToHead: undefined;
  SeasonPass: undefined;
  RankTier: { tier: string };
};

export type TabParamList = {
  Home: undefined;
  Library: undefined;
  Train: undefined;
  Coach: undefined;
  Profile: undefined;
};
