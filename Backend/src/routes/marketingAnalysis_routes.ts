// routes/marketing.ts or routes/campaign.ts
import express from "express";
import { runMarketingAlgo } from "../MarketingAlgorithms";
import {
  CampaignSetup,
  SlimBusinessInfo,
} from "../MarketingAlgorithms/types/marketingTypes";
import { Campaign } from "../services/googleAds/types";
import { findBusinessInfoByUserId } from "../services/businessInfo.service";

const router = express.Router();

router.post("/analyze", async (req: any, res: any) => {
  try {
    const { rawcampaign, userId } = req.body;

    if (!rawcampaign || !userId) {
      return res.status(400).json({ error: "Missing required data" });
    }

    const rawBusiness = await findBusinessInfoByUserId(userId);

    const result = await runMarketingAlgo(rawcampaign as Campaign, rawBusiness);

    res.json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Unexpected error" });
  }
});

export default router;
