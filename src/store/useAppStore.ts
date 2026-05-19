import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  User, Palette, Workout, ActiveWorkoutState, DayMetrics, ChatMessage,
  NutritionDay, PRRecord, BiometricEntry, RankData, SeasonMission,
  Achievement, WorkoutHistoryEntry, WeekDay, MuscleVolume,
} from '../types';

const DEFAULT_USER: User = {
  name: 'Alex', handle: 'alexm', age: 28, sex: 'male',
  weight: 78.4, height: 178, bodyFatPct: 14,
  goal: 'muscle', level: 'intermediate',
  equipment: ['barra', 'mancuernas', 'banco', 'polea'],
  injuries: [], dietType: 'omnivore', environment: 'gym',
  coachPersonality: 'drill', mealsPerDay: 5, allergies: [],
  xp: 4820, userLevel: 18,
};

const DEFAULT_WORKOUT: Workout = {
  id: 'w1', name: 'Push · Pecho y tríceps', split: 'Push', day: 5, week: 4, totalWeeks: 12,
  estimatedMinutes: 52, estimatedKcal: 420,
  exercises: [
    { exerciseId: 'e1', name: 'Press banca', sets: 4, repsMin: 6, repsMax: 8, weight: 72.5, weightUnit: 'kg', restSeconds: 120, isNewWeight: true },
    { exerciseId: 'e2', name: 'Press inclinado mancuernas', sets: 4, repsMin: 8, repsMax: 10, weight: 26, weightUnit: 'kg', restSeconds: 90 },
    { exerciseId: 'e3', name: 'Aperturas en polea alta', sets: 3, repsMin: 12, repsMax: 12, weight: 12, weightUnit: 'kg', restSeconds: 60 },
    { exerciseId: 'e4', name: 'Fondos en paralelas', sets: 3, repsMin: 0, repsMax: 0, weight: 0, weightUnit: 'BW', restSeconds: 90 },
    { exerciseId: 'e5', name: 'Press francés con cuerda', sets: 3, repsMin: 12, repsMax: 12, weight: 20, weightUnit: 'kg', restSeconds: 60 },
    { exerciseId: 'e6', name: 'Extensiones de tríceps polea', sets: 3, repsMin: 12, repsMax: 15, weight: 18, weightUnit: 'kg', restSeconds: 60 },
    { exerciseId: 'e7', name: 'Elevaciones laterales', sets: 4, repsMin: 12, repsMax: 12, weight: 8, weightUnit: 'kg', restSeconds: 60 },
    { exerciseId: 'e8', name: 'Cardio · cinta', sets: 1, repsMin: 10, repsMax: 10, weight: 0, weightUnit: 'BW', restSeconds: 0, isFinisher: true },
  ],
};

const DEFAULT_ACTIVE: ActiveWorkoutState = {
  isActive: false, workoutId: '', currentExerciseIndex: 0,
  currentSet: 1, repCount: 0, formScore: 92,
  isResting: false, restSecondsLeft: 0, startedAt: null, elapsedSeconds: 0,
};

const DEFAULT_METRICS: DayMetrics = {
  streakDays: 23, last7Days: [true, true, true, false, true, true, true],
  recoveryScore: 78, recoveryMessage: 'Listo para entrenar fuerte',
};

const DEFAULT_NUTRITION: NutritionDay = {
  calories: { current: 1840, target: 2400 },
  protein: { current: 142, target: 180 },
  carbs: { current: 188, target: 260 },
  fat: { current: 52, target: 75 },
  water: { current: 1.8, target: 3.0 },
  steps: 6210,
  meals: [
    { id: 'm1', time: '08:00', name: 'Desayuno', description: 'Avena + claras + plátano', calories: 640, macros: { protein: 42, carbs: 88, fat: 12, calories: 640 }, ingredients: [], preparation: [], status: 'done' },
    { id: 'm2', time: '13:30', name: 'Comida', description: 'Pollo, arroz, brócoli, AOVE', calories: 780, macros: { protein: 55, carbs: 98, fat: 18, calories: 780 }, ingredients: [], preparation: [], status: 'done' },
    { id: 'm3', time: '17:30', name: 'Pre-entreno', description: 'Café + tostada + miel', calories: 240, macros: { protein: 12, carbs: 42, fat: 6, calories: 240 }, ingredients: [], preparation: [], status: 'next' },
    { id: 'm4', time: '21:00', name: 'Cena', description: 'Salmón, boniato, espárragos', calories: 740, macros: { protein: 48, carbs: 62, fat: 24, calories: 740 }, ingredients: [], preparation: [], status: 'pending' },
  ],
};

const DEFAULT_RANK: RankData = {
  tier: 'oro', division: 'ORO III', xp: 4820, xpToNext: 820, xpTarget: 1200,
  seasonLevel: 22, seasonXP: 620, seasonXPTarget: 1000,
};

const DEFAULT_MISSIONS: SeasonMission[] = [
  { id: 's1', description: 'Entrena 5 días esta semana', progress: 4, target: 5, xpReward: 200, done: false },
  { id: 's2', description: 'Bate un récord personal', progress: 1, target: 1, xpReward: 300, done: true },
  { id: 's3', description: 'Cumple macros 4 días', progress: 3, target: 4, xpReward: 150, done: false },
  { id: 's4', description: 'Score forma > 90 en 3 sesiones', progress: 2, target: 3, xpReward: 250, done: false },
];

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', icon: 'flame', label: '30 días', unlocked: true },
  { id: 'a2', icon: 'trophy', label: '1er PR', unlocked: true },
  { id: 'a3', icon: 'dumbbell', label: '10t total', unlocked: true },
  { id: 'a4', icon: 'bolt', label: 'Madrugador', unlocked: true },
  { id: 'a5', icon: 'target', label: '100% sem', unlocked: false },
  { id: 'a6', icon: 'heart', label: '180 días', unlocked: false },
];

const DEFAULT_PRS: PRRecord[] = [
  { id: 'pr1', exerciseName: 'Press banca', value: '82,5 kg', date: new Date(), category: 'strength', isNew: true },
  { id: 'pr2', exerciseName: 'Sentadilla profunda', value: '122 kg', date: new Date(), category: 'strength', isNew: false },
  { id: 'pr3', exerciseName: 'Front lever aguante', value: '08 seg', date: new Date(), category: 'calisthenics', isNew: true },
  { id: 'pr4', exerciseName: 'Dominadas estrictas', value: '16 reps', date: new Date(), category: 'calisthenics', isNew: false },
  { id: 'pr5', exerciseName: 'Peso muerto', value: '145 kg', date: new Date(), category: 'strength', isNew: false },
];

const WEEK_SCHEDULE: WeekDay[] = [
  { day: 'L', split: 'Push', subtitle: 'Pecho · Tríceps', done: true },
  { day: 'M', split: 'Pull', subtitle: 'Espalda · Bíceps', done: true },
  { day: 'X', split: 'Pierna', subtitle: 'Cuádriceps · Glúteo', done: true },
  { day: 'J', split: 'Descanso', subtitle: 'Recuperación activa', rest: true },
  { day: 'V', split: 'Push', subtitle: 'Pecho · Tríceps', today: true },
  { day: 'S', split: 'Pull', subtitle: 'Espalda · Bíceps' },
  { day: 'D', split: 'Pierna', subtitle: 'Cuádriceps · Glúteo' },
];

const MUSCLE_VOLUMES: MuscleVolume[] = [
  { muscle: 'Pecho', current: 22, target: 24 },
  { muscle: 'Espalda', current: 24, target: 24 },
  { muscle: 'Pierna', current: 20, target: 22 },
  { muscle: 'Hombro', current: 14, target: 18 },
  { muscle: 'Brazo', current: 18, target: 20 },
];

const DEFAULT_COACH_MESSAGES: ChatMessage[] = [
  { id: '1', role: 'coach', text: 'Saliste tarde del trabajo. Bien. Ahora no me vengas con que estás cansado. Sé que tienes 40 minutos antes de cenar.', timestamp: new Date() },
];

interface AppState {
  user: User;
  isOnboarded: boolean;
  palette: Palette;
  todayWorkout: Workout;
  activeWorkout: ActiveWorkoutState;
  workoutHistory: WorkoutHistoryEntry[];
  weekSchedule: WeekDay[];
  muscleVolumes: MuscleVolume[];
  nutritionToday: NutritionDay;
  prRecords: PRRecord[];
  biometrics: BiometricEntry[];
  dayMetrics: DayMetrics;
  rankData: RankData;
  seasonMissions: SeasonMission[];
  achievements: Achievement[];
  coachMessages: ChatMessage[];
  isCoachTyping: boolean;
  setUser: (u: Partial<User>) => void;
  completeOnboarding: () => void;
  setPalette: (p: Palette) => void;
  startWorkout: () => void;
  completeSet: () => void;
  nextExercise: () => void;
  prevExercise: () => void;
  incrementReps: () => void;
  tickTimer: () => void;
  finishWorkout: (rpe: number) => void;
  startRest: (seconds: number) => void;
  tickRest: () => void;
  skipRest: () => void;
  markMealDone: (id: string) => void;
  addChatMessage: (msg: ChatMessage) => void;
  setCoachTyping: (v: boolean) => void;
  updateFormScore: (score: number) => void;
  addPR: (pr: PRRecord) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,
      isOnboarded: false,
      palette: 'lime',
      todayWorkout: DEFAULT_WORKOUT,
      activeWorkout: DEFAULT_ACTIVE,
      workoutHistory: [],
      weekSchedule: WEEK_SCHEDULE,
      muscleVolumes: MUSCLE_VOLUMES,
      nutritionToday: DEFAULT_NUTRITION,
      prRecords: DEFAULT_PRS,
      biometrics: [],
      dayMetrics: DEFAULT_METRICS,
      rankData: DEFAULT_RANK,
      seasonMissions: DEFAULT_MISSIONS,
      achievements: DEFAULT_ACHIEVEMENTS,
      coachMessages: DEFAULT_COACH_MESSAGES,
      isCoachTyping: false,

      setUser: (u) => set((s) => ({ user: { ...s.user, ...u } })),
      completeOnboarding: () => set({ isOnboarded: true }),
      setPalette: (p) => set({ palette: p }),

      startWorkout: () => set((s) => ({
        activeWorkout: {
          ...DEFAULT_ACTIVE, isActive: true,
          workoutId: s.todayWorkout.id,
          startedAt: new Date(),
        },
      })),

      completeSet: () => set((s) => {
        const ex = s.todayWorkout.exercises[s.activeWorkout.currentExerciseIndex];
        const nextSet = s.activeWorkout.currentSet + 1;
        if (nextSet > ex.sets) return s;
        return { activeWorkout: { ...s.activeWorkout, currentSet: nextSet, repCount: 0 } };
      }),

      nextExercise: () => set((s) => {
        const next = s.activeWorkout.currentExerciseIndex + 1;
        if (next >= s.todayWorkout.exercises.length) return s;
        return { activeWorkout: { ...s.activeWorkout, currentExerciseIndex: next, currentSet: 1, repCount: 0, isResting: false } };
      }),

      prevExercise: () => set((s) => {
        const prev = Math.max(0, s.activeWorkout.currentExerciseIndex - 1);
        return { activeWorkout: { ...s.activeWorkout, currentExerciseIndex: prev, currentSet: 1, repCount: 0, isResting: false } };
      }),

      incrementReps: () => set((s) => ({ activeWorkout: { ...s.activeWorkout, repCount: s.activeWorkout.repCount + 1 } })),

      tickTimer: () => set((s) => ({ activeWorkout: { ...s.activeWorkout, elapsedSeconds: s.activeWorkout.elapsedSeconds + 1 } })),

      startRest: (seconds) => set((s) => ({ activeWorkout: { ...s.activeWorkout, isResting: true, restSecondsLeft: seconds } })),

      tickRest: () => set((s) => {
        const left = s.activeWorkout.restSecondsLeft - 1;
        if (left <= 0) return { activeWorkout: { ...s.activeWorkout, isResting: false, restSecondsLeft: 0 } };
        return { activeWorkout: { ...s.activeWorkout, restSecondsLeft: left } };
      }),

      skipRest: () => set((s) => ({ activeWorkout: { ...s.activeWorkout, isResting: false, restSecondsLeft: 0 } })),

      updateFormScore: (score) => set((s) => ({ activeWorkout: { ...s.activeWorkout, formScore: score } })),

      finishWorkout: (rpe) => set((s) => {
        const entry: WorkoutHistoryEntry = {
          id: Date.now().toString(),
          date: new Date(),
          name: s.todayWorkout.name,
          duration: s.activeWorkout.elapsedSeconds,
          volume: 6840,
          sets: 27,
          calories: s.todayWorkout.estimatedKcal,
          formScore: s.activeWorkout.formScore,
          rpe,
        };
        return {
          activeWorkout: { ...DEFAULT_ACTIVE },
          workoutHistory: [entry, ...s.workoutHistory],
          dayMetrics: { ...s.dayMetrics, streakDays: s.dayMetrics.streakDays + 1 },
        };
      }),

      markMealDone: (id) => set((s) => ({
        nutritionToday: {
          ...s.nutritionToday,
          meals: s.nutritionToday.meals.map((m) => m.id === id ? { ...m, status: 'done' } : m),
        },
      })),

      addChatMessage: (msg) => set((s) => ({ coachMessages: [...s.coachMessages.slice(-49), msg] })),
      setCoachTyping: (v) => set({ isCoachTyping: v }),

      addPR: (pr) => set((s) => ({ prRecords: [pr, ...s.prRecords] })),
    }),
    {
      name: 'forge-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        user: s.user,
        isOnboarded: s.isOnboarded,
        palette: s.palette,
        dayMetrics: s.dayMetrics,
        coachMessages: s.coachMessages,
        prRecords: s.prRecords,
        rankData: s.rankData,
        achievements: s.achievements,
      }),
    }
  )
);
