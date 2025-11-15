import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const GOOGLE_API_KEY = "AIzaSyDfdXhZcGwp4MkXeaYjo5W_s_5KgibkSBo"
export const ai = genkit({
  plugins: [googleAI({ apiKey: GOOGLE_API_KEY })],
  model: 'googleai/gemini-2.5-flash-lite',
});
