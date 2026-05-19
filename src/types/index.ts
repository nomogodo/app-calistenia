export type Palette = 'lime' | 'inferno' | 'ice' | 'bone';
export type Goal = 'muscle' | 'strength' | 'fat' | 'calisthenics' | 'athletic';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'elite';
export type MessageRole = 'coach' | 'user';

export interface User {
  name: string;
  weight: number;
  height: number;
  age: number;
  sex: 'male' | 'female';
  goal: Goal;
  level: DifficultyLevel;
  equipment: string[];
}

export interface MuscleActivation {
  name: string;
  percentage: number;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  equipment: string;
  difficulty: DifficultyLevel;
  pattern: string;
  plane: string;
  muscles: MuscleActivation[];
  coachNotes: string[];
  videoDuration: string;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: number;
  reps: string;
  weight: string;
}

export interface Workout {
  id: string;
  name: string;
  week: number;
  totalWeeks: number;
  exercises: WorkoutExercise[];
  durationMin: number;
  kcal: number;
}

export interface ActiveWorkoutState {
  workout: Workout | null;
  currentExerciseIndex: number;
  currentSet: number;
  currentReps: number;
  isActive: boolean;
  startedAt: Date | null;
  formScore: number;
  tempo: string;
  rom: number;
  restSecondsRemaining: number;
  elapsedSeconds: number;
}

export interface Meal {
  id: string;
  time: string;
  type: string;
  description: string;
  kcal: number;
  status: 'done' | 'next' | 'pending';
}

export interface DayMetrics {
  caloriesConsumed: number;
  caloriesGoal: number;
  proteinG: number;
  proteinGoalG: number;
  steps: number;
  stepsGoal: number;
  streakDays: number;
  last7Days: boolean[];
  recoveryScore: number;
}

export interface PlanLine {
  number: string;
  name: string;
  sets: string;
  changed: boolean;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  options?: string[];
  plan?: PlanLine[];
  timestamp: Date;
}
