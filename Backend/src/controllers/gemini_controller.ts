/* istanbul ignore file */ // ignore for coverage

import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { Campaign } from "../services/googleAds/types";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.KEYWORDS_GEMINI_API_KEY || "");

export async function getGeminiKeywordsFromCampaign(
  campaign: Campaign
): Promise<{ keywordText: string; matchType: string }[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `
You are a Google Ads marketing assistant.

Your task is to generate 5–10 marketing keyword ideas for a Google Ads campaign.

Campaign Information:
- Name: ${campaign.name}
- Type: ${campaign.advertisingChannelType}
- Goal: ${
    campaign.optimizationGoalSetting?.optimizationGoalTypes?.[0] ??
    "not specified"
  }
- Start Date: ${campaign.startDate}
- End Date: ${campaign.endDate}
- Budget (micros): ${campaign.targetSpend?.targetSpendingAmountMicros ?? "N/A"}
- Scheduled Time: ${campaign.scheduledTime ?? "Not specified"}

👉 Please generate keywords that are highly relevant and optimized for this campaign's goal and targeting.

Return the result as a **valid JSON array**, where each keyword object contains:
- keywordText: the actual keyword (string)
- matchType: one of ["EXACT", "PHRASE", "BROAD"]

📦 Example output:
[
  {
    "keywordText": "עורך דין חוזים",
    "matchType": "EXACT"
  },
  {
    "keywordText": "ייעוץ משפטי לעסקים",
    "matchType": "PHRASE"
  }
]

⚠️ Do NOT include any explanation or markdown. Return only the raw JSON array.
`.trim();

  const result = await model.generateContent(prompt);
  const text = (await result.response.text()).trim();

  const cleaned = text
    .replace(/```json\s*/i, "")
    .replace(/```$/, "")
    .trim();

  return JSON.parse(cleaned);
}
