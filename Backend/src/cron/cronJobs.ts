import cron from "node-cron";
import { runMarketingAlgo } from "../MarketingAlgorithms/index";
import { findBusinessInfoByUserId } from "../services/businessInfo.service";
import { GoogleAdsService } from "../services/googleAds/googleAds.service";
import userModel from "../models/user_models";
import { Campaign } from "../services/googleAds/types";

console.log("🔁 Cron system loaded");

// everyday at 8:00 AM
async function handleDailyMarketingJob() {
  console.log("running marketing analysis job...");
  try {
    const users = await userModel.find({ googleCustomerId: { $ne: null } });
    console.log("users found:", users.length);

    for (const user of users) {
      try {
        const customerId = user.googleCustomerId;
        const userId = user._id?.toString();

        if (!userId || !customerId) continue;

        const rawBusiness = await findBusinessInfoByUserId(userId);

        const googleAdsService = new GoogleAdsService({
          clientId: process.env.GOOGLE_ADS_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
          developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
          refreshToken: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
          redirectUri: process.env.GOOGLE_ADS_REDIRECT_URI!,
          customerId: customerId,
        });

        // get all campigns of the user
        const campaigns: Campaign[] = await googleAdsService.getCampaigns();

        for (const campaign of campaigns) {
          const result = await runMarketingAlgo(campaign, rawBusiness);

          console.log(
            `Analysis result for ${user.email} / campaign "${campaign.name}"`
          );

          const { suggestions } = result;

          const updateFields = {
            startDate: suggestions.startDate?.replace(/-/g, ""),
            endDate: suggestions.endDate?.replace(/-/g, ""),

            name: campaign.name,
            status: campaign.status,
            campaignBudget: campaign.campaignBudget,
            biddingStrategyType: campaign.biddingStrategyType,
            manualCpc: campaign.manualCpc,
            targetSpend: campaign.targetSpend,
          };

          const keywordIdeas = suggestions.llmSuggestions?.keywordIdeas ?? [];
          const formattedKeywords = keywordIdeas.map((kw) => ({
            text: kw,
            matchType: "BROAD", // בהמשך אולי לתת לגימיני להגדיר גם את הסוג של כל מילה
          }));

          // roni- to add to campign
          // const adGroupId = campaign.adGroupId;
          // temp group id
          const adGroupId = "1234567890"; // replace with actual adGroupId

          try {
            await googleAdsService.updateCampaignAndKeywords(
              campaign.id,
              updateFields,
              adGroupId,
              formattedKeywords
            );

            console.log(`Campaign "${campaign.name}" updated with keywords`);
          } catch (err) {
            console.error(`Failed to update campaign "${campaign.name}":`, err);
          }
        }
      } catch (err) {
        console.error(`Error processing user ${user.email}:`, err);
      }
    }
  } catch (error) {
    console.error("Cron job failed:", error);
  }
}

cron.schedule("0 8 * * *", handleDailyMarketingJob);

void handleDailyMarketingJob();
