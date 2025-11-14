'use server';

/**
 * @fileOverview AI-powered conflict resolution flow.
 *
 * - resolveConflict - A function that resolves scheduling conflicts by suggesting alternative times or re-prioritizing tasks.
 * - ResolveConflictInput - The input type for the resolveConflict function.
 * - ResolveConflictOutput - The return type for the resolveConflict function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResolveConflictInputSchema = z.object({
  calendarData: z.string().describe('The user calendar data in JSON format.'),
  taskData: z.string().describe('The user task data in JSON format.'),
  conflictDescription: z.string().describe('Description of the scheduling conflict.'),
});
export type ResolveConflictInput = z.infer<typeof ResolveConflictInputSchema>;

const ResolveConflictOutputSchema = z.object({
  suggestedResolution: z.string().describe('AI-driven suggestion for resolving the conflict.'),
});
export type ResolveConflictOutput = z.infer<typeof ResolveConflictOutputSchema>;

export async function resolveConflict(input: ResolveConflictInput): Promise<ResolveConflictOutput> {
  return resolveConflictFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resolveConflictPrompt',
  input: {schema: ResolveConflictInputSchema},
  output: {schema: ResolveConflictOutputSchema},
  prompt: `You are an AI assistant specialized in resolving scheduling conflicts.
  Given the following calendar data, task data, and a description of the conflict, provide a clear and actionable suggestion to resolve the conflict. Suggest alternative times or re-prioritize tasks as needed.

  Calendar Data: {{{calendarData}}}
  Task Data: {{{taskData}}}
  Conflict Description: {{{conflictDescription}}}

  Respond with a brief and direct resolution.
  `,
});

const resolveConflictFlow = ai.defineFlow(
  {
    name: 'resolveConflictFlow',
    inputSchema: ResolveConflictInputSchema,
    outputSchema: ResolveConflictOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
