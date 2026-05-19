export type Palette = 'lime' | 'inferno' | 'ice' | 'bone' | 'volt' | 'blood' | 'royal' | 'mint' | 'sunset' | 'forest' | 'carbon' | 'copper';
export type Goal = 'muscle' | 'strength' | 'fat' | 'calisthenics' | 'athletic';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'elite';
export type MessageRole = 'user' | 'coach';
export type Sex = 'male' | 'female' | 'other';
export type DietType = 'omnivore' | 'vegetarian' | 'vegan' | 'keto' | 'mediterranean' | 'intermittent';
export type TrainingEnvironment = 'gym' | 'park' | 'home';
export type CoachPersonality = 'drill' | 'scientist' | 'zen' | 'hype';
export type Rank = 'recluta' | 'bronce' | 'plata' | 'oro' | 'platino' | 'diamante' | 'maestro' | 'elite';
export type PRCategory = 'strength' | 'calisthenics' | 'endurance' | 'hypertrophy';

export interface ColorTokens {
  bg: string; bg2: string; surface: string; surface2: string;
  line: string; line2: string; fg: string; fg2: string;
  muted: string; dim: string; accent: string; accentInk: string;
  danger: string; positive: string;
}

export interface InjuryZone { id: string; name: string; severity: string; color: string; }

export interface User {
  name: string; handle: string; age: number; sex: Sex;
  weight: number; height: number; bodyFatPct: number;
  goal: Goal; level: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  equipment: string[]; injuries: InjuryZone[];
  dietType: DietType; environment: TrainingEnvironment;
  coachPersonality: CoachPersonality; mealsPerDay: number;
  allergies: string[]; xp: number; userLevel: number;
}

export interface MuscleActivation { name: string; percentage: number; }

export interface Exercise {
  id: string; name: string; category: string; equipment: string;
  difficulty: DifficultyLevel; pattern: string; plane: string;
  muscles: MuscleActivation[]; coachNotes: string[]; videoDuration: string;
}

export interface WorkoutExercise {
  exerciseId: string; name: string; sets: number; repsMin: number; repsMax: number;
  weight: number; weightUnit: 'kg' | 'BW'; restSeconds: number;
  isNewWeight?: boolean; isFinisher?: boolean; pose?: string;
}

export interface Workout {
  id: string; name: string; split: string; day: number; week: number;
  totalWeeks: number; exercises: WorkoutExercise[];
  estimatedMinutes: number; estimatedKcal: number;
}

export interface ActiveWorkoutState {
  isActive: boolean; workoutId: string; currentExerciseIndex: number;
  currentSet: number; repCount: number; formScore: number;
  isResting: boolean; restSecondsLeft: number;
  startedAt: Date | null; elapsedSeconds: number;
}

export interface MacroData { protein: number; carbs: number; fat: number; calories: number; }
export interface Ingredient { name: string; grams: number; calories: number; }

export interface MealDetail {
  id: string; time: string; name: string; description: string;
  calories: number; macros: MacroData; ingredients: Ingredient[];
  preparation: string[]; status: 'done' | 'next' | 'pending';
}

export interface NutritionDay {
  calories: { current: number; target: number };
  protein: { current: number; target: number };
  carbs: { current: number; target: number };
  fat: { current: number; target: number };
  water: { current: number; target: number };
  steps: number; meals: MealDetail[];
}

export interface PRRecord {
  id: string; exerciseName: string; value: string;
  date: Date; category: PRCategory; isNew: boolean;
}

export interface BiometricEntry {
  date: Date; chest: number; waist: number; hips: number;
  arm: number; thigh: number; bodyFat: number; weight: number;
  restingHR: number; bloodPressure: string;
}

export interface ProgressPhoto { id: string; date: Date; pose: 'front' | 'back' | 'left' | 'right'; weight: number; }
export interface Achievement { id: string; icon: string; label: string; unlocked: boolean; }

export interface RankData {
  tier: Rank; division: string; xp: number; xpToNext: number; xpTarget: number;
  seasonLevel: number; seasonXP: number; seasonXPTarget: number;
}

export interface SeasonMission {
  id: string; description: string; progress: number; target: number; xpReward: number; done: boolean;
}

export interface WorkoutHistoryEntry {
  id: string; date: Date; name: string; duration: number;
  volume: number; sets: number; calories: number; formScore: number; rpe: number;
}

export interface DayMetrics {
  streakDays: number; last7Days: boolean[]; recoveryScore: number; recoveryMessage: string;
}

export interface PlanLine { number: string; name: string; sets: string; changed?: boolean; }

export interface ChatMessage {
  id: string; role: MessageRole; text: string; timestamp: Date;
  options?: string[]; plan?: PlanLine[];
}

export interface WeekDay {
  day: string; split: string; subtitle: string;
  done?: boolean; today?: boolean; rest?: boolean;
}

export interface MuscleVolume { muscle: string; current: number; target: number; }
