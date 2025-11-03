'use server';
/**
 * @fileOverview Detects anomalies in inventory data using AI.
 *
 * - detectInventoryAnomalies - A function to detect anomalies in inventory data.
 * - DetectInventoryAnomaliesInput - The input type for the detectInventoryAnomalies function.
 * - DetectInventoryAnomaliesOutput - The return type for the detectInventoryAnomalies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectInventoryAnomaliesInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  quantity: z.number().describe('The current quantity of the product in stock.'),
  expectedQuantity: z
    .number()
    .describe('The expected quantity of the product in stock based on historical data.'),
  historicalData: z
    .string()
    .describe(
      `Historical inventory data for the product, including dates and quantities. Should be a JSON string.
      Example: [{"date": "2024-01-01", "quantity": 100}, {"date": "2024-01-08", "quantity": 110}]`
    ),
});
export type DetectInventoryAnomaliesInput = z.infer<typeof DetectInventoryAnomaliesInputSchema>;

const DetectInventoryAnomaliesOutputSchema = z.object({
  isAnomaly: z.boolean().describe('Whether or not an anomaly is detected.'),
  anomalyExplanation: z
    .string()
    .describe('Explanation of the anomaly, if one is detected.'),
});
export type DetectInventoryAnomaliesOutput = z.infer<typeof DetectInventoryAnomaliesOutputSchema>;

export async function detectInventoryAnomalies(
  input: DetectInventoryAnomaliesInput
): Promise<DetectInventoryAnomaliesOutput> {
  return detectInventoryAnomaliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectInventoryAnomaliesPrompt',
  input: {schema: DetectInventoryAnomaliesInputSchema},
  output: {schema: DetectInventoryAnomaliesOutputSchema},
  prompt: `You are a quality assurance expert in a pharmaceutical company. Your task is to detect anomalies in inventory data.

You are given the current quantity of a product, the expected quantity, and historical data. Analyze this information to determine if there is an anomaly.

Product Name: {{{productName}}}
Current Quantity: {{{quantity}}}
Expected Quantity: {{{expectedQuantity}}}
Historical Data: {{{historicalData}}}

Consider factors such as sudden drops or unexpected increases in quantity, deviations from expected volumes, and discrepancies in documentation.

Based on your analysis, determine if there is an anomaly and provide an explanation.

Output the results in JSON format with the following fields:
- isAnomaly: true if an anomaly is detected, false otherwise.
- anomalyExplanation: A brief explanation of the anomaly, if one is detected. If no anomaly is detected, this field should be null.

Example:
{
  "isAnomaly": true,
  "anomalyExplanation": "The current quantity is significantly lower than the expected quantity, which could indicate a potential issue such as spoilage or theft."}
`,
});

const detectInventoryAnomaliesFlow = ai.defineFlow(
  {
    name: 'detectInventoryAnomaliesFlow',
    inputSchema: DetectInventoryAnomaliesInputSchema,
    outputSchema: DetectInventoryAnomaliesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
