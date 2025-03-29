import { Request, Response } from "express";
import campaignModel from "../models/campaign_modles";
import path from "path";
import fs from "fs";

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const campaignImage = req.file ? `uploads/campaign_images/${req.file.filename}` : undefined;

    const newCampaign = new campaignModel({ ...req.body, campaignImage });
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

export const getCampaignById = async (req: Request, res: Response) : Promise<void> => {
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

export const updateCampaign = async (req: Request, res: Response) : Promise<void> => {
  try {
    const campaign = await campaignModel.findById(req.params.id);
    if (!campaign) {
         res.status(404).json({ error: "Campaign not found" });
        return;
    }

    let campaignImage = campaign.campaignImage;

    if (req.file) {
      const newImage = `uploads/campaign_images/${req.file.filename}`;
      const oldImage = campaign.campaignImage ? path.join(__dirname, "../../", campaign.campaignImage) : null;

      if (oldImage && fs.existsSync(oldImage)) await fs.promises.unlink(oldImage);

      campaignImage = newImage;
    }

    const updated = await campaignModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
      campaignImage,
    }, { new: true });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCampaign = async (req: Request, res: Response) : Promise<void> => {
  try {
    const campaign = await campaignModel.findById(req.params.id);
    if (!campaign) {
        res.status(404).json({ error: "Campaign not found" });
        return;
    }

    if (campaign.campaignImage) {
      const imagePath = path.join(__dirname, "../../", campaign.campaignImage);
      if (fs.existsSync(imagePath)) await fs.promises.unlink(imagePath);
    }

    await campaignModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const markInterest = async (req: Request, res: Response) : Promise<void> => {
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

export const removeInterest = async (req: Request, res: Response) : Promise<void> => {
  const { campaignId } = req.params;
  const { userId } = req.body;

  try {
    const campaign = await campaignModel.findById(campaignId);
    if (!campaign) { 
        res.status(404).json({ error: "Campaign not found" });
        return;
    }

    campaign.interestedUsers = campaign.interestedUsers?.filter(id => id !== userId);
    await campaign.save();

    res.status(200).json({ message: "Interest removed", interested: campaign.interestedUsers?.length });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
