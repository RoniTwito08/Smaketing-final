import { Request, Response, RequestHandler } from "express";
import { GoogleAdsService } from "../services/googleAds/googleAds.service";
import { googleAdsConfig } from "../config/google.config";
import { google } from "googleapis";

class GoogleAdsController {
  private googleAdsService = new GoogleAdsService(googleAdsConfig);

  private createGoogleAdsService(refreshToken: string, customerId: string) {
    return new GoogleAdsService({
      clientId: process.env.GOOGLE_ADS_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
      refreshToken,
      customerId,
      redirectUri: process.env.GOOGLE_ADS_REDIRECT_URI!,
    });
  }

  // -------------------------------------------------------------------------------------
  // GET ALL CAMPAIGNS
  // -------------------------------------------------------------------------------------
  public getAllCampaigns: RequestHandler = async (req, res) => {
    try {
      const { customerId, refreshToken } = req.query;
      if (!customerId || !refreshToken) {
        res.status(400).json({ error: "Customer ID and refresh token are required" });
        return;
      }

      const googleAdsService = this.createGoogleAdsService(
        refreshToken as string,
        customerId as string
      );
      const campaigns = await googleAdsService.getCampaigns();
      res.status(200).json(campaigns);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      res.status(500).json({ error: "Failed to fetch campaigns" });
    }
  };

  // -------------------------------------------------------------------------------------
  // GET CAMPAIGN STATS
  // -------------------------------------------------------------------------------------
  public getCampaignStats: RequestHandler = async (req, res) => {
    try {
      const { campaignId } = req.params;
      const { startDate, endDate, customerId, refreshToken } = req.query;

      if (!campaignId || !startDate || !endDate || !customerId || !refreshToken) {
        res.status(400).json({ error: "Missing required parameters" });
        return;
      }

      const googleAdsService = this.createGoogleAdsService(
        refreshToken as string,
        customerId as string
      );
      const stats = await googleAdsService.getCampaignStatistics(
        campaignId,
        startDate as string,
        endDate as string
      );

      res.status(200).json(stats);
      return;
    } catch (error) {
      console.error("Error fetching campaign statistics:", error);
      res.status(500).json({ error: "Failed to fetch campaign statistics" });
      return;
    }
  };

  // -------------------------------------------------------------------------------------
  // UPDATE CAMPAIGN
  // -------------------------------------------------------------------------------------
  public updateCampaign: RequestHandler = async (req, res) => {
    try {
      const { campaignId } = req.params;
      if (!campaignId) {
        res.status(400).json({ error: "Missing campaignId in param." });
        return;
      }
  
      // Extract possible campaign updates + ad group / keywords
      const {
        name,
        status,
        startDate,
        endDate,
        campaignBudget,
        biddingStrategyType,
        manualCpc,
        targetSpend,
        adGroupId,
        keywords,
      } = req.body;
  
      // 1) Update the campaign (bidding/budget/dates/etc.)
      const updatedCampaign = await this.googleAdsService.updateCampaign(campaignId, {
        name,
        status,
        startDate,
        endDate,
        campaignBudget,
        biddingStrategyType,
        manualCpc,
        targetSpend,
      });
  
      // 2) If request includes any keywords, update or add them
      if (adGroupId && Array.isArray(keywords) && keywords.length > 0) {
        // For each keyword object, decide whether to ADD or UPDATE
        for (const kw of keywords) {
          // Example shape of kw: { text, matchType, criterionId?, status? }
          if (kw.criterionId) {
            // Update existing keyword
            await this.googleAdsService.updateKeyword(adGroupId, kw.criterionId, {
              text: kw.text,
              matchType: kw.matchType,
              status: kw.status,
            });
          } else {
            // Add a new keyword
            await this.googleAdsService.addKeywordsToAdGroup(adGroupId, [
              {
                text: kw.text,
                matchType: kw.matchType,
              },
            ]);
          }
        }
      }
  
      // Return final response
      void res.status(200).json({
        message: "Campaign updated successfully (keywords handled)",
        data: updatedCampaign,
      });
    } catch (error: any) {
      console.error("Error updating campaign:", error);
      void res.status(500).json({ error: error.message });
    }
  };

  // -------------------------------------------------------------------------------------
  // ADD KEYWORDS
  // -------------------------------------------------------------------------------------
  public addKeywords: RequestHandler = async (req, res) => {
    try {
      const { adGroupId } = req.params;
      const { keywords } = req.body; // e.g. [{ text: "shoes", matchType: "BROAD" }, ...]
  
      if (!adGroupId || !keywords?.length) {
        res.status(400).json({ error: "Missing adGroupId or keywords array." });
        return;
      }
  
      const result = await this.googleAdsService.addKeywordsToAdGroup(
        adGroupId,
        keywords
      );
  
      res.status(200).json({ message: "Keywords added", result });
    } catch (error: any) {
      console.error("Error adding keywords:", error);
      res.status(500).json({ error: error.message });
    }
  };

  // -------------------------------------------------------------------------------------
  // UPDATE KEYWORD
  // -------------------------------------------------------------------------------------
  public updateKeyword: RequestHandler = async (req, res) => {
    try {
      const { adGroupId, criterionId } = req.params;
      const { text, matchType, status } = req.body;

      if (!adGroupId || !criterionId) {
        res.status(400).json({ error: "Missing adGroupId or criterionId." });
        return;
      }

      const updated = await this.googleAdsService.updateKeyword(adGroupId, criterionId, {
        text,
        matchType,
        status,
      });

      res.status(200).json({
        message: "Keyword updated",
        data: updated,
      });
    } catch (error: any) {
      console.error("Error updating keyword:", error);
      res.status(500).json({ error: error.message });
    }
  };

  // -------------------------------------------------------------------------------------
  // REMOVE KEYWORD
  // -------------------------------------------------------------------------------------
  public removeKeyword: RequestHandler = async (req, res) => {
    try {
      const { adGroupId, criterionId } = req.params;
      if (!adGroupId || !criterionId) {
        res.status(400).json({ error: "Missing adGroupId or criterionId." });
        return;
      }

      const removed = await this.googleAdsService.removeKeyword(adGroupId, criterionId);
      res.status(200).json({
        message: "Keyword removed",
        data: removed,
      });
    } catch (error: any) {
      console.error("Error removing keyword:", error);
      res.status(500).json({ error: error.message });
    }
  };

  // -------------------------------------------------------------------------------------
  // CAMPAIGNS HANDLER (wrapper for getAllCampaigns)
  // -------------------------------------------------------------------------------------
  public campaignsHandler: RequestHandler = async (req, res) => {
    console.log("Received campaign request:", {
      query: req.query,
      headers: req.headers,
      url: req.url,
    });

    try {
      await this.getAllCampaigns(req, res, () => {});
    } catch (error: any) {
      console.error("Campaign handler error:", {
        message: error.message,
        stack: error.stack,
      });
      res.status(500).json({ error: error.message });
    }
  };

  // -------------------------------------------------------------------------------------
  // CAMPAIGN STATS HANDLER (wrapper for getCampaignStats)
  // -------------------------------------------------------------------------------------
  public campaignStatsHandler: RequestHandler = async (req, res) => {
    await this.getCampaignStats(req, res, () => {});
  };

  // -------------------------------------------------------------------------------------
  // OAUTH CALLBACK ROUTE
  // -------------------------------------------------------------------------------------
  public authCallbackHandler: RequestHandler = async (req, res) => {
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
      console.error("Error getting tokens:", error);
      res.status(500).json({ error: "Failed to get tokens" });
    }
  };
}

export default new GoogleAdsController();