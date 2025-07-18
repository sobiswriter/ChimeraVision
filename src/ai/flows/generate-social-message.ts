'use server';

/**
 * @fileOverview An AI agent to generate social messages for the game.
 *
 * - generateSocialMessage - A function that generates social messages.
 * - GenerateSocialMessageInput - The input type for the generateSocialMessage function.
 * - GenerateSocialMessageOutput - The return type for the generateSocialMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSocialMessageInputSchema = z.object({
  gameContext: z
    .string()
    .describe('The current context of the game, including game state, recent events, and player actions.'),
  playerPersona: z
    .string()
    .describe('The persona of the player, including their preferred style of communication and typical in-game behavior.'),
});
export type GenerateSocialMessageInput = z.infer<typeof GenerateSocialMessageInputSchema>;

const GenerateSocialMessageOutputSchema = z.object({
  message: z.string().describe('The generated social message.'),
});
export type GenerateSocialMessageOutput = z.infer<typeof GenerateSocialMessageOutputSchema>;

export async function generateSocialMessage(input: GenerateSocialMessageInput): Promise<GenerateSocialMessageOutput> {
  return generateSocialMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialMessagePrompt',
  input: {schema: GenerateSocialMessageInputSchema},
  output: {schema: GenerateSocialMessageOutputSchema},
  prompt: `You are an AI assistant designed to generate social messages for a player in a game. 
You will receive the game context and the player's persona, and you will generate a message that is appropriate for the situation and the player's style.

Game Context: {{{gameContext}}}
Player Persona: {{{playerPersona}}}

Generated Message:`,
});

const generateSocialMessageFlow = ai.defineFlow(
  {
    name: 'generateSocialMessageFlow',
    inputSchema: GenerateSocialMessageInputSchema,
    outputSchema: GenerateSocialMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
