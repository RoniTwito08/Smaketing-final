import {
  convertGoogleCampaign,
  convertBusinessInfoToSlim,
  convertCampaignToSetup,
} from "./converter";
import { analyzePerformance } from "./analyzer";
import { detectIssues } from "./issueDetector";
import { generatePrompt } from "./promptGenerator";
import { callLLM } from "./service";
import { Campaign } from "../services/googleAds/types";
import {
  SmartCampaignData,
  GooglePerformanceData,
  SlimBusinessInfo,
  CampaignSetup,
  CampaignUpdatePayload,
} from "./types/marketingTypes";

export async function runMarketingAlgo(
  // rawGoogleData: any,
  rawcampaign: Campaign,
  rawBusiness: any
): Promise<{
  analysis: ReturnType<typeof analyzePerformance>;
  issues: string[];
  prompt: string;
  suggestions: CampaignUpdatePayload;
}> {
  const googleData = convertGoogleCampaign(rawcampaign); // Convert the raw Google data to a structured format
  const campaignSetup = convertCampaignToSetup(rawcampaign); // Convert the raw campaign data to a structured format
  const businessInfo = convertBusinessInfoToSlim(rawBusiness); // Convert the raw business data to a structured format

  // add type
  const smartCampaign: SmartCampaignData = {
    googleData,
    businessInfo,
    campaignSetup,
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
