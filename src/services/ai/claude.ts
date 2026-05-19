import Anthropic from '@anthropic-ai/sdk';
import Constants from 'expo-constants';
import { ChatMessage } from '../../types';
import { COACH_SYSTEM_PROMPT, buildWorkoutContext } from './prompts';

function getApiKey(): string {
  return (
    Constants.expoConfig?.extra?.anthropicApiKey ??
    process.env.ANTHROPIC_API_KEY ??
    ''
  );
}

export async function sendMessageToCoach(
  messages: ChatMessage[],
  userText: string,
  context: { userName: string; goal: string; workoutName?: string }
): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey || apiKey === 'ANTHROPIC_API_KEY') {
    return 'Configura tu ANTHROPIC_API_KEY en el archivo .env para activar el coach IA.';
  }

  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

  const contextLine = buildWorkoutContext(context.userName, context.goal, context.workoutName);
  const systemWithContext = `${COACH_SYSTEM_PROMPT}\n\nCONTEXTO: ${contextLine}`;

  const history = messages
    .slice(-14)
    .filter((m) => m.text.trim().length > 0)
    .map((m) => ({
      role: m.role === 'coach' ? ('assistant' as const) : ('user' as const),
      content: m.text,
    }));

  history.push({ role: 'user', content: userText });

  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 350,
    system: systemWithContext,
    messages: history,
  });

  const block = response.content[0];
  if (block.type === 'text') return block.text.trim();
  return 'Sin respuesta del coach.';
}
