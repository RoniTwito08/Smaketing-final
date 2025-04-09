import cron from "node-cron";
import { runMarketingAlgo } from "../MarketingAlgorithms/index";
import { findBusinessInfoByUserId } from "../services/businessInfo.service";
import { GoogleAdsService } from "../services/googleAds/googleAds.service";
import userModel from "../models/user_models";
import { Campaign } from "../services/googleAds/types";

console.log("🔁 Cron system loaded");

// everyday at 8:00 AM
cron.schedule("0 8 * * *", async () => {
  console.log("🔁 Running daily marketing analysis job...");
  try {
    const users = await userModel.find({ googleCustomerId: { $ne: null } });

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
            `Analysis result for ${user.email} / campaign "${campaign.name}":`
          );
          console.log(JSON.stringify(result, null, 2));
        }
      } catch (err) {
        console.error(`Error processing user ${user.email}:`, err);
      }
    }
  } catch (error) {
    console.error("Cron job failed:", error);
  }
});
