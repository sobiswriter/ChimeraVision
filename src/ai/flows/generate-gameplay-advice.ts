'use server';
/**
 * @fileOverview AI-powered gameplay advice generator.
 *
 * - generateGameplayAdvice - A function that generates gameplay suggestions based on the current game context.
 * - GenerateGameplayAdviceInput - The input type for the generateGameplayAdvice function.
 * - GenerateGameplayAdviceOutput - The return type for the generateGameplayAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGameplayAdviceInputSchema = z.object({
  gameContext: z.string().describe('The current game context, including game state, player stats, and opponent information.'),
});
export type GenerateGameplayAdviceInput = z.infer<typeof GenerateGameplayAdviceInputSchema>;

const GenerateGameplayAdviceOutputSchema = z.object({
  advice: z.string().describe('Helpful suggestions and strategy for the player based on the game context.'),
});
export type GenerateGameplayAdviceOutput = z.infer<typeof GenerateGameplayAdviceOutputSchema>;

export async function generateGameplayAdvice(input: GenerateGameplayAdviceInput): Promise<GenerateGameplayAdviceOutput> {
  return generateGameplayAdviceFlow(input);
}

const generateGameplayAdvicePrompt = ai.definePrompt({
  name: 'generateGameplayAdvicePrompt',
  input: {schema: GenerateGameplayAdviceInputSchema},
  output: {schema: GenerateGameplayAdviceOutputSchema},
  prompt: `You are an AI gaming assistant providing helpful gameplay advice.

  Based on the current game context, provide the player with strategic suggestions to improve their gameplay.

  Game Context: {{{gameContext}}}
  `,
});

const generateGameplayAdviceFlow = ai.defineFlow(
  {
    name: 'generateGameplayAdviceFlow',
    inputSchema: GenerateGameplayAdviceInputSchema,
    outputSchema: GenerateGameplayAdviceOutputSchema,
  },
  async input => {
    const {output} = await generateGameplayAdvicePrompt(input);
    return output!;
  }
);
