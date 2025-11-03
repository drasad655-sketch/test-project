'use server';
/**
 * @fileOverview An anomaly detection AI agent for supply chain.
 *
 * - detectSupplyChainAnomalies - A function that handles the supply chain anomaly detection process.
 * - DetectSupplyChainAnomaliesInput - The input type for the detectSupplyChainAnomalies function.
 * - DetectSupplyChainAnomaliesOutput - The return type for the detectSupplyChainAnomalies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectSupplyChainAnomaliesInputSchema = z.object({
  shipmentData: z.string().describe('The shipment data, including transit times and temperature ranges.'),
  expectedTransitTime: z.string().describe('The expected transit time for the shipment.'),
  expectedTemperatureRange: z.string().describe('The expected temperature range for the shipment.'),
});
export type DetectSupplyChainAnomaliesInput = z.infer<typeof DetectSupplyChainAnomaliesInputSchema>;

const DetectSupplyChainAnomaliesOutputSchema = z.object({
  anomalyDetected: z.boolean().describe('Whether or not an anomaly was detected.'),
  explanation: z.string().describe('The explanation of the anomaly, if any.'),
});
export type DetectSupplyChainAnomaliesOutput = z.infer<typeof DetectSupplyChainAnomaliesOutputSchema>;

export async function detectSupplyChainAnomalies(input: DetectSupplyChainAnomaliesInput): Promise<DetectSupplyChainAnomaliesOutput> {
  return detectSupplyChainAnomaliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectSupplyChainAnomaliesPrompt',
  input: {schema: DetectSupplyChainAnomaliesInputSchema},
  output: {schema: DetectSupplyChainAnomaliesOutputSchema},
  prompt: `You are an expert supply chain analyst specializing in detecting anomalies in pharmaceutical shipments.\n\nYou will use the shipment data, expected transit time, and expected temperature range to determine if there are any anomalies.\n\nShipment Data: {{{shipmentData}}}\nExpected Transit Time: {{{expectedTransitTime}}}\nExpected Temperature Range: {{{expectedTemperatureRange}}}\n\nBased on this information, determine if an anomaly was detected and provide an explanation.\n\nAnomaly Detected: {{anomalyDetected}}\nExplanation: {{explanation}}`,
});

const detectSupplyChainAnomaliesFlow = ai.defineFlow(
  {
    name: 'detectSupplyChainAnomaliesFlow',
    inputSchema: DetectSupplyChainAnomaliesInputSchema,
    outputSchema: DetectSupplyChainAnomaliesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
