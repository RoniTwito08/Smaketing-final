import { Request , Response } from "express";
import Campaign from "../models/campaign_model";

const createCampaign = async (req: Request, res: Response) => {
    try {
        const { content, image, tags } = req.body;
        const userId = req.user?._id; 

        if (!content || !userId) {
            res.status(400).json({ success: false, message: "Content and userId are required" });
            return;
        }

        const campaign = await Campaign.create({ userId, content, image, tags });
        res.status(201).json({ success: true, data: campaign });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


const getCampaign = async (req: Request, res: Response) => {
    try {
        const campaign = await Campaign.find();
        if (!campaign) {
            res.status(404).json({ message: "No campaign found" });
            return;
        }
        res.status(200).json({ campaign , success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const getCampaignById = async (req: Request, res: Response) => {
    try {
        const campaignId = req.params.campaignId;
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.status(200).json({ campaign , success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const getCampaignByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id; 
        const campaign = await Campaign.find({userId});
        if (!campaign) {
            res.status(404).json({ message: "No campaign found" });
            return;
        }
        res.status(200).json({ campaign ,success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateCampaignById = async (req: Request, res: Response) => {
    try {
        const campaignId = req.params.campaignId;
        const { content, tags } = req.body;
        const userId = req.user?._id;

        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            res.status(404).json({ success: false, message: "Post not found" });
            return;
        }

        if (campaign.userId !== userId) {
            res.status(403).json({ success: false, message: "Unauthorized to update this post" });
            return;
        }

        campaign.content = content || campaign.content;
        campaign.tags = tags || campaign.tags;
        await campaign.save();

        res.status(200).json({ success: true, data: campaign });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


const deleteCampaignById = async (req: Request, res: Response) => {
    try {
        const campaignId = req.params.campaignId;
        const userId = req.user?._id;

        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            res.status(404).json({ success: false, message: "Post not found" });
            return;
        }

        if (campaign.userId !== userId) {
            res.status(403).json({ success: false, message: "Unauthorized to delete this post" });
            return;
        }

        await campaign.deleteOne();
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
 
const CampaignController = { createCampaign, getCampaign, getCampaignById, getCampaignByUserId, updateCampaignById, deleteCampaignById};

export default CampaignController;


        
