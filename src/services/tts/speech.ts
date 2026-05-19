import * as Speech from 'expo-speech';

export async function speakCoach(text: string): Promise<void> {
  const isSpeaking = await Speech.isSpeakingAsync();
  if (isSpeaking) Speech.stop();

  Speech.speak(text, {
    language: 'es-ES',
    pitch: 0.88,
    rate: 1.08,
  });
}

export function stopSpeech(): void {
  Speech.stop();
}

export async function isSpeaking(): Promise<boolean> {
  return Speech.isSpeakingAsync();
}
