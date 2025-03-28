import { convertGoogleCampaign } from "./converter";
import { analyzePerformance } from "./analyzer";
import { detectIssues } from "./issueDetector";
import { generatePrompt } from "./promptGenerator";
import { callLLM } from "./service";
import type {
  SmartCampaignData,
  SlimBusinessInfo,
  CampaignSetup,
  CampaignUpdatePayload,
} from "./types/marketingTypes";

export async function runMarketingAlgo(
  rawGoogleData: any,
  campaignInfo: CampaignSetup,
  businessInfo: SlimBusinessInfo
): Promise<{
  analysis: ReturnType<typeof analyzePerformance>;
  issues: string[];
  prompt: string;
  suggestions: CampaignUpdatePayload;
}> {
  const googleData = convertGoogleCampaign(rawGoogleData);

  const smartCampaign: SmartCampaignData = {
    googleData,
    businessInfo,
    campaignSetup: campaignInfo,
  };

  const analysis = analyzePerformance(smartCampaign.googleData);
  const issues = detectIssues(smartCampaign.googleData, analysis);
  const prompt = generatePrompt(smartCampaign, analysis, issues);

  const llmResponse = (await callLLM(prompt)) as CampaignUpdatePayload;

  return {
    analysis,
    issues,
    prompt,
    suggestions: llmResponse,
  };
}
