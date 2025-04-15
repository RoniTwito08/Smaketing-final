import { Request, Response } from "express";
import campaignModel from "../models/campaign_modles";
import userModel from "../models/user_models";
import path from "path";
import fs from "fs";
import { GoogleAdsService } from "../services/googleAds/googleAds.service"; 
import { googleAdsConfig } from "../config/google.config"; 
import { CampaignStatus, AdvertisingChannelType } from "../services/googleAds/types";
import {getGeminiKeywordsFromCampaign} from "../controllers/gemini_controller"; // Adjust the import path as necessary
const googleAdsService = new GoogleAdsService(googleAdsConfig);

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const newCampaign = new campaignModel({ ...req.body });
    await newCampaign.save();

    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

export const getAllCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await campaignModel.find().populate("feedbacks");
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCampaignById = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaign = await campaignModel.findById(req.params.id).populate("feedbacks");
    if (!campaign) {
      res.status(404).json({ error: "Campaign not found" });
      return;
    }

    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaign = await campaignModel.findById(req.params.id);
    if (!campaign) {
      res.status(404).json({ error: "Campaign not found" });
      return;
    }

    const updated = await campaignModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
    }, { new: true });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaign = await campaignModel.findById(req.params.id);
    if (!campaign) {
      res.status(404).json({ error: "Campaign not found" });
      return;
    }

    // מחיקה ללא טיפול בתמונה
    await campaignModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const markInterest = async (req: Request, res: Response): Promise<void> => {
  const { campaignId } = req.params;
  const { userId } = req.body;

  try {
    const campaign = await campaignModel.findById(campaignId);
    if (!campaign) {
      res.status(404).json({ error: "Campaign not found" });
      return;
    }

    if (!campaign.interestedUsers?.includes(userId)) {
      campaign.interestedUsers = [...(campaign.interestedUsers || []), userId];
      await campaign.save();
    }

    res.status(200).json({ message: "Marked as interested", interested: campaign.interestedUsers.length });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeInterest = async (req: Request, res: Response): Promise<void> => {
  const { campaignId } = req.params;
  const { userId } = req.body;

  try {
    const campaign = await campaignModel.findById(campaignId);
    if (!campaign) {
      res.status(404).json({ error: "Campaign not found" });
      return;
    }

    campaign.interestedUsers = campaign.interestedUsers?.filter((id) => id !== userId);
    await campaign.save();

    res.status(200).json({ message: "Interest removed", interested: campaign.interestedUsers?.length });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const fetchGoogleCampaigns = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerId } = req.query;
    if (!customerId || typeof customerId !== 'string') {
      res.status(400).json({ error: 'Missing or invalid customerId' });
      return;
    }

    const campaigns = await googleAdsService.getCampaigns();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch campaigns', details: error });
  }
};

export const fetchCampaignStatistics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;
    const { id } = req.params;

    if (!startDate || !endDate) {
      res.status(400).json({ error: "Missing startDate or endDate" });
      return;
    }

    const stats = await googleAdsService.getCampaignStatistics(
      id,
      startDate as string,
      endDate as string
    );

    
    const summary = stats.reduce(
      (acc, item) => {
        acc.clicks += item.clicks;
        acc.impressions += item.impressions;
        acc.conversions += item.conversions;
        acc.costMicros += item.costMicros;
        return acc;
      },
      {
        clicks: 0,
        impressions: 0,
        conversions: 0,
        costMicros: 0,
      }
    );

    const ctr = summary.impressions ? summary.clicks / summary.impressions : 0;

    res.status(200).json({
      ...summary,
      ctr,
      dailyBreakdown: stats,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch campaign statistics", details: error });
  }
};

export const launchGoogleAdsCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const { businessName, objective, userId } = req.body;

    if (!userId) {
      res.status(400).json({ error: "Missing userId" });
      return ;
    }

    const customerId = await googleAdsService.createCustomerClient({
      businessName,
      currencyCode: "ILS",
      timeZone: "Asia/Jerusalem"
    });

    await userModel.findByIdAndUpdate(userId, {
      googleCustomerId: customerId
    });

    const today = new Date();
    const startDate = today.toISOString().split("T")[0].replace(/-/g, "");
    const endDate = new Date(today.setMonth(today.getMonth() + 1))
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "");

    const campaign = await googleAdsService.createCampaign({
      name: `קמפיין של ${businessName}`,
      status: CampaignStatus.PAUSED,
      advertisingChannelType: AdvertisingChannelType.SEARCH,
      startDate,
      endDate,
    }, customerId);

    const adGroup = await googleAdsService.createAdGroup({
      name: "Ad Group for Shoes",
      campaignResourceName: campaign.resourceName!,
      status: "ENABLED",
    }, customerId);

    // save adgroup in campain model
    await campaignModel.findByIdAndUpdate(campaign.id, {
      adGroupId: adGroup.id,
    });

    // Generate keywords using Gemini
    const keywords = await getGeminiKeywordsFromCampaign(campaign);

    await googleAdsService.addKeywordsToAdGroup(adGroup.id, keywords.map(kw => ({ text: kw.keywordText, matchType: kw.matchType })));

    res.status(201).json({
      message: "Campaign launched successfully",
      customerId,
      campaign,
    });
  } catch (error) {
    console.error("Error launching campaign:", error);
    res.status(500).json({ error: "Failed to launch campaign" });
  }
};



export const getAllCampaignsByUserId = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const campaigns = await campaignModel.find({ creatorId: userId });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
  
};


