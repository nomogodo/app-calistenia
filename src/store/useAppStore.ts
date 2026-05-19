import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Workout, ActiveWorkoutState, Meal, DayMetrics, ChatMessage, Palette } from '../types';
import { EXERCISES } from '../constants/exercises';

interface AppState {
  user: User;
  isOnboarded: boolean;
  palette: Palette;
  todayWorkout: Workout;
  activeWorkout: ActiveWorkoutState;
  mealsToday: Meal[];
  dayMetrics: DayMetrics;
  coachMessages: ChatMessage[];
  isCoachTyping: boolean;

  setUser: (partial: Partial<User>) => void;
  completeOnboarding: () => void;
  setPalette: (palette: Palette) => void;
  startWorkout: () => void;
  completeSet: () => void;
  nextExercise: () => void;
  prevExercise: () => void;
  updateFormScore: (score: number) => void;
  incrementReps: () => void;
  tickTimer: () => void;
  finishWorkout: () => void;
  markMealDone: (mealId: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  setCoachTyping: (typing: boolean) => void;
}

const DEFAULT_WORKOUT: Workout = {
  id: 'w1',
  name: 'Push · Pecho y tríceps',
  week: 4,
  totalWeeks: 12,
  durationMin: 52,
  kcal: 420,
  exercises: [
    { exercise: EXERCISES[0], sets: 4, reps: '6-8', weight: '70kg' },
    { exercise: EXERCISES[8], sets: 4, reps: '8-10', weight: '26kg' },
    { exercise: EXERCISES[2], sets: 3, reps: '12', weight: '12kg' },
    { exercise: EXERCISES[9], sets: 3, reps: 'AMRAP', weight: 'BW' },
    { exercise: EXERCISES[11], sets: 3, reps: '12', weight: 'cable' },
    { exercise: EXERCISES[4], sets: 3, reps: '10', weight: '45kg' },
    { exercise: EXERCISES[7], sets: 4, reps: '8', weight: 'BW' },
    { exercise: EXERCISES[1], sets: 5, reps: '5', weight: '100kg' },
  ],
};

const DEFAULT_MEALS: Meal[] = [
  { id: 'm1', time: '08:00', type: 'Desayuno', description: 'Avena + claras + plátano', kcal: 640, status: 'done' },
  { id: 'm2', time: '13:30', type: 'Comida', description: 'Pollo, arroz, brócoli, AOVE', kcal: 780, status: 'done' },
  { id: 'm3', time: '17:30', type: 'Pre-entreno', description: 'Café + tostada + miel', kcal: 240, status: 'next' },
  { id: 'm4', time: '21:00', type: 'Cena', description: 'Salmón, boniato, espárragos', kcal: 740, status: 'pending' },
];

const DEFAULT_METRICS: DayMetrics = {
  caloriesConsumed: 1840,
  caloriesGoal: 2400,
  proteinG: 142,
  proteinGoalG: 180,
  steps: 6210,
  stepsGoal: 10000,
  streakDays: 23,
  last7Days: [true, true, true, false, true, true, true],
  recoveryScore: 78,
};

const INITIAL_COACH_MESSAGES: ChatMessage[] = [
  {
    id: 'c0',
    role: 'coach',
    text: 'Saliste tarde del trabajo. Bien. Ahora no me vengas con que estás cansado. Sé que tienes 40 minutos antes de cenar.',
    timestamp: new Date(),
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: {
        name: 'Alex',
        weight: 80,
        height: 178,
        age: 28,
        sex: 'male',
        goal: 'muscle',
        level: 'intermediate',
        equipment: ['barra', 'mancuernas', 'polea', 'paralelas'],
      },
      isOnboarded: false,
      palette: 'lime',
      todayWorkout: DEFAULT_WORKOUT,
      activeWorkout: {
        workout: null,
        currentExerciseIndex: 0,
        currentSet: 1,
        currentReps: 0,
        isActive: false,
        startedAt: null,
        formScore: 92,
        tempo: '3-1-2',
        rom: 98,
        restSecondsRemaining: 0,
        elapsedSeconds: 42,
      },
      mealsToday: DEFAULT_MEALS,
      dayMetrics: DEFAULT_METRICS,
      coachMessages: INITIAL_COACH_MESSAGES,
      isCoachTyping: false,

      setUser: (partial) => set((s) => ({ user: { ...s.user, ...partial } })),
      completeOnboarding: () => set({ isOnboarded: true }),
      setPalette: (palette) => set({ palette }),

      startWorkout: () =>
        set((s) => ({
          activeWorkout: {
            ...s.activeWorkout,
            workout: s.todayWorkout,
            isActive: true,
            startedAt: new Date(),
            currentExerciseIndex: 0,
            currentSet: 1,
            currentReps: 0,
            elapsedSeconds: 0,
          },
        })),

      completeSet: () =>
        set((s) => {
          const { activeWorkout, todayWorkout } = s;
          const currentEx = todayWorkout.exercises[activeWorkout.currentExerciseIndex];
          if (!currentEx) return s;
          const isLastSet = activeWorkout.currentSet >= currentEx.sets;
          const isLastExercise =
            activeWorkout.currentExerciseIndex >= todayWorkout.exercises.length - 1;
          if (isLastSet && isLastExercise) {
            return { activeWorkout: { ...activeWorkout, isActive: false } };
          }
          if (isLastSet) {
            return {
              activeWorkout: {
                ...activeWorkout,
                currentExerciseIndex: activeWorkout.currentExerciseIndex + 1,
                currentSet: 1,
                currentReps: 0,
              },
            };
          }
          return {
            activeWorkout: {
              ...activeWorkout,
              currentSet: activeWorkout.currentSet + 1,
              currentReps: 0,
            },
          };
        }),

      nextExercise: () =>
        set((s) => ({
          activeWorkout: {
            ...s.activeWorkout,
            currentExerciseIndex: Math.min(
              s.activeWorkout.currentExerciseIndex + 1,
              s.todayWorkout.exercises.length - 1
            ),
            currentSet: 1,
            currentReps: 0,
          },
        })),

      prevExercise: () =>
        set((s) => ({
          activeWorkout: {
            ...s.activeWorkout,
            currentExerciseIndex: Math.max(s.activeWorkout.currentExerciseIndex - 1, 0),
            currentSet: 1,
            currentReps: 0,
          },
        })),

      updateFormScore: (score) =>
        set((s) => ({ activeWorkout: { ...s.activeWorkout, formScore: score } })),

      incrementReps: () =>
        set((s) => ({
          activeWorkout: { ...s.activeWorkout, currentReps: s.activeWorkout.currentReps + 1 },
        })),

      tickTimer: () =>
        set((s) => ({
          activeWorkout: {
            ...s.activeWorkout,
            elapsedSeconds: s.activeWorkout.elapsedSeconds + 1,
          },
        })),

      finishWorkout: () =>
        set((s) => ({
          activeWorkout: { ...s.activeWorkout, isActive: false, workout: null },
        })),

      markMealDone: (mealId) =>
        set((s) => ({
          mealsToday: s.mealsToday.map((m) =>
            m.id === mealId ? { ...m, status: 'done' as const } : m
          ),
        })),

      addChatMessage: (message) =>
        set((s) => ({ coachMessages: [...s.coachMessages, message] })),

      setCoachTyping: (typing) => set({ isCoachTyping: typing }),
    }),
    {
      name: 'forge-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isOnboarded: state.isOnboarded,
        palette: state.palette,
        dayMetrics: state.dayMetrics,
        coachMessages: state.coachMessages.slice(-50),
      }),
    }
  )
);
