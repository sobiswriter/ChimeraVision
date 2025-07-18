"use server";

import { generateSocialMessage, type GenerateSocialMessageInput } from "@/ai/flows/generate-social-message";
import type { ChatMessage } from "@/lib/types";

export async function askAI(message: string): Promise<ChatMessage> {
  const input: GenerateSocialMessageInput = {
    gameContext: `The user just said: "${message}". The player is in a futuristic city, about to start a new mission.`,
    playerPersona: 'A witty and strategic AI companion named Chip.',
  };

  try {
    const { message: aiText } = await generateSocialMessage(input);

    return {
      id: crypto.randomUUID(),
      author: 'ai',
      text: aiText,
    };
  } catch (error) {
    console.error("Error calling AI:", error);
    return {
      id: crypto.randomUUID(),
      author: 'ai',
      text: 'Sorry, I seem to have short-circuited. Try again in a moment.',
    };
  }
}
