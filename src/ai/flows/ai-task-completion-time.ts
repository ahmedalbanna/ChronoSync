'use server';

/**
 * @fileOverview An AI agent that intelligently factors in the possibility of extra time needed for certain tasks.
 *
 * - suggestTaskCompletionTime - A function that handles the task completion time suggestion process.
 * - SuggestTaskCompletionTimeInput - The input type for the suggestTaskCompletionTime function.
 * - SuggestTaskCompletionTimeOutput - The return type for the suggestTaskCompletionTime function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTaskCompletionTimeInputSchema = z.object({
  taskName: z.string().describe('The name of the task.'),
  taskDescription: z.string().describe('A detailed description of the task.'),
  taskPriority: z.enum(['LOW', 'MEDIUM', 'HIGH']).describe('The priority level of the task.'),
  historicalData: z.string().describe('Historical data on similar tasks, including actual completion times.'),
  externalFactors: z.string().describe('Any external factors that might influence task completion time, such as meetings or deadlines.'),
});
export type SuggestTaskCompletionTimeInput = z.infer<typeof SuggestTaskCompletionTimeInputSchema>;

const SuggestTaskCompletionTimeOutputSchema = z.object({
  estimatedCompletionTime: z.string().describe('The estimated completion time for the task, in hours.'),
  confidenceLevel: z
    .string()
    .describe('A confidence level in the estimated completion time (LOW, MEDIUM, HIGH).'),
  reasoning: z.string().describe('The reasoning behind the estimated completion time and confidence level.'),
});
export type SuggestTaskCompletionTimeOutput = z.infer<typeof SuggestTaskCompletionTimeOutputSchema>;

export async function suggestTaskCompletionTime(
  input: SuggestTaskCompletionTimeInput
): Promise<SuggestTaskCompletionTimeOutput> {
  return suggestTaskCompletionTimeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaskCompletionTimePrompt',
  input: {schema: SuggestTaskCompletionTimeInputSchema},
  output: {schema: SuggestTaskCompletionTimeOutputSchema},
  prompt: `You are an AI assistant specializing in time management and task estimation.

  Based on the provided information, estimate the completion time for the task, considering the task's description, priority, historical data on similar tasks, and any external factors.

  Task Name: {{{taskName}}}
  Task Description: {{{taskDescription}}}
  Task Priority: {{{taskPriority}}}
  Historical Data: {{{historicalData}}}
  External Factors: {{{externalFactors}}}

  Provide an estimated completion time in hours, a confidence level (LOW, MEDIUM, HIGH), and a detailed reasoning for your estimation.
  Estimated Completion Time: 
  Confidence Level: 
  Reasoning: `,
});

const suggestTaskCompletionTimeFlow = ai.defineFlow(
  {
    name: 'suggestTaskCompletionTimeFlow',
    inputSchema: SuggestTaskCompletionTimeInputSchema,
    outputSchema: SuggestTaskCompletionTimeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
