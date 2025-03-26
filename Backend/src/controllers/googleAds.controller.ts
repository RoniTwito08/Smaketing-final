import { Request, Response } from 'express';
import { GoogleAdsService } from '../services/googleAds/googleAds.service';

class GoogleAdsController {
  private createGoogleAdsService(refreshToken: string, customerId: string) {
    return new GoogleAdsService({
      clientId: process.env.GOOGLE_ADS_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
      refreshToken,
      customerId
    });
  }

  getAllCampaigns = async (req: Request, res: Response) => {
    try {
      const { customerId, refreshToken } = req.query;
      if (!customerId || !refreshToken) {
        return res.status(400).json({ error: 'Customer ID and refresh token are required' });
      }

      const googleAdsService = this.createGoogleAdsService(refreshToken as string, customerId as string);
      const campaigns = await googleAdsService.getCampaigns();
      res.status(200).json(campaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      res.status(500).json({ error: 'Failed to fetch campaigns' });
    }
  };

  getCampaignStats = async (req: Request, res: Response) => {
    try {
      const { campaignId } = req.params;
      const { startDate, endDate, customerId, refreshToken } = req.query;

      if (!campaignId || !startDate || !endDate || !customerId || !refreshToken) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      const googleAdsService = this.createGoogleAdsService(refreshToken as string, customerId as string);
      const stats = await googleAdsService.getCampaignStatistics(
        campaignId,
        startDate as string,
        endDate as string
      );
      
      res.status(200).json(stats);
    } catch (error) {
      console.error('Error fetching campaign statistics:', error);
      res.status(500).json({ error: 'Failed to fetch campaign statistics' });
    }
  };
}

export default new GoogleAdsController(); 