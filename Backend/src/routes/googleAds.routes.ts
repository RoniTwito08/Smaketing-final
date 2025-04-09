import express, { Request, Response, RequestHandler } from 'express';
import googleAdsController from '../controllers/googleAds_controller';

const router = express.Router();


router.put("/campaigns/:campaignId", googleAdsController.updateCampaign);
router.get('/campaigns', googleAdsController.campaignsHandler);
router.get('/campaigns/:campaignId/statistics', googleAdsController.campaignStatsHandler);
router.post('/auth/callback', googleAdsController.authCallbackHandler);
router.post("/adGroups/:adGroupId/keywords", googleAdsController.addKeywords);
router.put("/adGroups/:adGroupId/keywords/:criterionId", googleAdsController.updateKeyword);
router.delete("/adGroups/:adGroupId/keywords/:criterionId", googleAdsController.removeKeyword);

export default router; 