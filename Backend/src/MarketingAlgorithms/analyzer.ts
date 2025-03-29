import { GooglePerformanceData } from "./types/marketingTypes";

//לוקח את המידע של גוגל ומנתח
export function analyzePerformance(data: GooglePerformanceData) {
  return {
    ctr: data.ctr,
    avgCpc: data.avgCpc,
    totalCost: data.totalCost,
    impressions: data.impressions,
    clicks: data.clicks,
    conversions: data.conversions,
    conversionRate:
      data.impressions > 0 ? data.conversions / data.impressions : 0,
    costPerConversion:
      data.costPerConversion ??
      (data.conversions > 0 ? data.totalCost / data.conversions : null),
    conversionValue: data.conversionValue,
    averagePosition: data.averagePosition,
    interactionRate: data.interactionRate,
    averageCpm: data.averageCpm,
    averageCpv: data.averageCpv,
    videoViewRate: data.videoViewRate,
  };
}

// קצת הסברים מהצאט להבנה עמוקה של מה זה מחזיר

// 🎯 What It Returns:
// An object with key performance metrics that:

// Give insights into how the campaign is performing

// Are used later for:

// 📊 Issue detection

// 🤖 Prompt generation for Gemini
