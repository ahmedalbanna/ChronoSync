'use server';

/**
 * @fileOverview An AI-powered schedule suggestion flow.
 *
 * - suggestSchedule - A function that suggests optimal times for scheduling events and tasks.
 * - SuggestScheduleInput - The input type for the suggestSchedule function.
 * - SuggestScheduleOutput - The return type for the suggestSchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestScheduleInputSchema = z.object({
  schedule: z.string().describe('The user\'s current schedule in JSON format.'),
  taskList: z.string().describe('The user\'s task list in JSON format.'),
  priorities: z.string().describe('The user\'s priorities in JSON format.'),
  eventDescription: z
    .string()
    .describe('The description of the event to be scheduled.'),
  duration: z.number().describe('The duration of the event in minutes.'),
});
export type SuggestScheduleInput = z.infer<typeof SuggestScheduleInputSchema>;

const SuggestScheduleOutputSchema = z.object({
  suggestedTime: z
    .string()
    .describe(
      'The suggested time for the event in ISO 8601 format (e.g., 2024-01-01T10:00:00Z).' /* Example output */
    ),
  reasoning: z.string().describe('The AI\'s reasoning for suggesting this time.'),
  potentialConflicts: z
    .string()
    .describe('Any potential scheduling conflicts with existing events.'),
  extraTimeRecommendation: z.boolean().describe('Whether or not to allocate extra time for task completion')
});
export type SuggestScheduleOutput = z.infer<typeof SuggestScheduleOutputSchema>;


export async function suggestSchedule(input: SuggestScheduleInput): Promise<SuggestScheduleOutput> {
  return suggestScheduleFlow(input);
}

const considerExtraTimeTool = ai.defineTool({
  name: 'considerExtraTime',
  description: 'Determine if the model should allocate extra time for the completion of the scheduled task.',
  inputSchema: z.object({
    probabilityOfNeedingExtraTime: z
      .number()
      .describe('The likelihood of the task requiring more time to complete than originally scheduled.'),
    timeBuffer: z.number().describe('The suggested time buffer in minutes if extra time is needed.'),
  }),
  outputSchema: z.boolean(),
}, async (input) => {
  // If the model returns a high probability of needing extra time,
  // suggest allocating extra time for the completion of the task.
  return input.probabilityOfNeedingExtraTime > 0.5;
});

const prompt = ai.definePrompt({
  name: 'suggestSchedulePrompt',
  input: {schema: SuggestScheduleInputSchema},
  output: {schema: SuggestScheduleOutputSchema},
  tools: [considerExtraTimeTool],
  prompt: `Given the following user schedule, task list, and priorities, suggest the optimal time to schedule a new event.

Schedule: {{{schedule}}}
Task List: {{{taskList}}}
Priorities: {{{priorities}}}
Event Description: {{{eventDescription}}}
Duration: {{{duration}}} minutes

Consider potential conflicts and aim to maximize productivity. Provide a detailed reasoning for your suggestion.

Output the suggested time in ISO 8601 format (e.g., 2024-01-01T10:00:00Z).

If you believe allocating extra time for the task completion is vital, use the considerExtraTime tool to recommend extra time allocation. The tool requires probabilityOfNeedingExtraTime (likelihood of needing more time) and timeBuffer (suggested time buffer in minutes). If the probability is high, and a reasonable time buffer is provided, then use the tool.`,
});

const suggestScheduleFlow = ai.defineFlow(
  {
    name: 'suggestScheduleFlow',
    inputSchema: SuggestScheduleInputSchema,
    outputSchema: SuggestScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
