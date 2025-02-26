import express from "express";
import CampaignControllers from "../controllers/campaign_controller";
import { Router } from "express";
import { authMiddleware } from "../controllers/auth_controller";

const router = express.Router();

router.post("/createCampaign", authMiddleware, CampaignControllers.createCampaign);

router.get("/getCampaign", CampaignControllers.getCampaign);

router.get("/getCampaignById/:postId", CampaignControllers.getCampaignById);

router.get("/getPostByUserId" ,authMiddleware , CampaignControllers.getCampaignByUserId);

router.put("/updatePostById/:postId", authMiddleware, CampaignControllers.updateCampaignById);

router.delete("/deletePostById/:postId", authMiddleware, CampaignControllers.deleteCampaignById);

export default router;