import express, { Request, Response, RequestHandler } from 'express';
import { google } from 'googleapis';
import googleAdsController from '../controllers/googleAds_controller';

const router = express.Router();

const campaignsHandler: RequestHandler = async (req, res) => {
  console.log('Received campaign request:', {
    query: req.query,
    headers: req.headers,
    url: req.url
  });
  
  try {
    await googleAdsController.getAllCampaigns(req, res);
  } catch (error: any) {
    console.error('Campaign handler error:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ error: error.message });
  }
};

const campaignStatsHandler: RequestHandler = async (req, res) => {
  await googleAdsController.getCampaignStats(req, res);
};

// OAuth callback route
const authCallbackHandler: RequestHandler = async (req, res) => {
  const { code } = req.body;
  
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ADS_CLIENT_ID,
    process.env.GOOGLE_ADS_CLIENT_SECRET,
    `${req.headers.origin}/google-ads`
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);
    res.json({ refreshToken: tokens.refresh_token });
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).json({ error: 'Failed to get tokens' });
  }
};

router.get('/campaigns', campaignsHandler);
router.get('/campaigns/:campaignId/statistics', campaignStatsHandler);
router.post('/auth/callback', authCallbackHandler);

export default router; 