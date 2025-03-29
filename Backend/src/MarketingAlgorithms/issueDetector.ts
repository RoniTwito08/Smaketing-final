import { GooglePerformanceData } from "./types/marketingTypes";
import { analyzePerformance } from "./analyzer";

export function detectIssues(
  data: GooglePerformanceData,
  analysis: ReturnType<typeof analyzePerformance>
): string[] {
  const issues: string[] = [];

  if (analysis.ctr < 0.015) {
    issues.push(
      "Low CTR – users see the ad but don’t click. Improve headlines or targeting."
    );
  }

  if (analysis.conversionRate < 0.03) {
    issues.push(
      "Low conversion rate – users click but don’t convert. Improve landing page."
    );
  }

  if (data.totalCost > 50 && data.conversions === 0) {
    issues.push("Wasted budget – high spend with no conversions.");
  }

  if (analysis.avgCpc > 2.5) {
    issues.push(
      "High CPC – consider more specific or lower-competition keywords."
    );
  }

  if (
    analysis.averagePosition !== undefined &&
    analysis.averagePosition > 3.5
  ) {
    issues.push(
      "Low average position – your ads may not be getting enough visibility."
    );
  }

  if (analysis.videoViewRate !== undefined && analysis.videoViewRate < 0.15) {
    issues.push(
      "Low video view rate – consider improving video thumbnail or targeting."
    );
  }

  if (
    analysis.interactionRate !== undefined &&
    analysis.interactionRate < 0.05
  ) {
    issues.push("Low interaction rate – users are not engaging with your ad.");
  }

  if (
    analysis.costPerConversion !== null &&
    analysis.costPerConversion !== undefined &&
    analysis.costPerConversion > 10
  ) {
    issues.push(
      "High cost per conversion – consider adjusting bid strategy or targeting."
    );
  }

  return issues;
}
