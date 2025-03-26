import { request } from "gaxios";
import { AuthService } from "./auth.service";
import { Campaign, CampaignStatistics, GoogleAdsConfig } from "./types";

export class GoogleAdsService {
  private baseUrl = "https://googleads.googleapis.com/v14";
  private authService: AuthService;
  private customerId: string;
  private developerToken: string;

  constructor(config: GoogleAdsConfig) {
    this.authService = new AuthService(config);
    this.customerId = config.customerId;
    this.developerToken = config.developerToken;
  }

  private async getHeaders() {
    const accessToken = await this.authService.getAccessToken();
    return {
      Authorization: `Bearer ${accessToken}`,
      "developer-token": this.developerToken,
    };
  }

  async getCampaigns(): Promise<Campaign[]> {
    const query = `
      SELECT 
        campaign.resource_name,
        campaign.id, 
        campaign.name, 
        campaign.status,
        campaign.advertising_channel_type,
        campaign.start_date,
        campaign.end_date,
        campaign.target_spend,
        campaign.manual_cpc,
        campaign.network_settings,
        campaign.geo_target_type_setting,
        campaign.campaign_budget,
        campaign.bidding_strategy_type,
        campaign.accessible_bidding_strategy,
        campaign.labels,
        campaign.frequency_caps,
        campaign.optimization_score,
        campaign.excluded_parent_asset_set_groups,
        campaign.bidding_strategy,
        campaign.serving_status,
        campaign.ad_serving_optimization_status,
        campaign.payment_mode,
        campaign.optimization_goal_setting,
        campaign.tracking_setting,
        campaign.audience_setting,
        campaign.real_time_bidding_setting,
        metrics.clicks,
        metrics.impressions,
        metrics.cost_micros,
        metrics.conversions,
        metrics.conversions_value,
        metrics.average_cpc,
        metrics.ctr,
        metrics.average_position,
        metrics.interaction_rate,
        metrics.average_cpm,
        metrics.video_view_rate,
        metrics.average_cpv,
        segments.date,
        segments.hour,
        segments.quarter,
        segments.month,
        segments.week,
        segments.day_of_week,
        segments.device,
        segments.conversion_action,
        segments.conversion_action_category,
        segments.conversion_action_name,
        segments.external_conversion_source
      FROM campaign
      WHERE campaign.status != 'REMOVED'
    `;

    const response = await request({
      url: `${this.baseUrl}/customers/${this.customerId}/googleAds:search`,
      method: "POST",
      headers: await this.getHeaders(),
      data: { query },
    });

    return this.transformCampaignResponse(response.data);
  }

  async getCampaignStatistics(
    campaignId: string,
    startDate: string,
    endDate: string
  ): Promise<CampaignStatistics[]> {
    const query = `
      SELECT 
        campaign.id, 
        campaign.name, 
        metrics.impressions, 
        metrics.clicks, 
        metrics.conversions, 
        metrics.cost_micros,
        segments.date
      FROM campaign
      WHERE campaign.id = '${campaignId}'
      AND segments.date BETWEEN '${startDate}' AND '${endDate}'
    `;

    const response = await request({
      url: `${this.baseUrl}/customers/${this.customerId}/googleAds:search`,
      method: "POST",
      headers: await this.getHeaders(),
      data: { query },
    });

    return this.transformStatisticsResponse(response.data);
  }

  async createCampaign(campaign: Omit<Campaign, "id">): Promise<Campaign> {
    const response = await request({
      url: `${this.baseUrl}/customers/${this.customerId}/campaigns`,
      method: "POST",
      headers: await this.getHeaders(),
      data: this.transformCampaignRequest(campaign),
    });

    return this.transformCampaignResponse(response.data)[0];
  }

  private transformCampaignResponse(data: any): Campaign[] {
    return data.results.map((result: any) => ({
      id: result.campaign.id,
      resourceName: result.campaign.resourceName,
      name: result.campaign.name,
      status: result.campaign.status,
      advertisingChannelType: result.campaign.advertisingChannelType,
      startDate: result.campaign.startDate,
      endDate: result.campaign.endDate,
      scheduledTime: result.campaign.scheduledTime,
      targetSpend: result.campaign.targetSpend,
      manualCpc: result.campaign.manualCpc,
      networkSettings: result.campaign.networkSettings,
      geoTargetTypeSetting: result.campaign.geoTargetTypeSetting,
      campaignBudget: result.campaign.campaignBudget,
      biddingStrategyType: result.campaign.biddingStrategyType,
      accessibleBiddingStrategy: result.campaign.accessibleBiddingStrategy,
      labels: result.campaign.labels,
      frequencyCaps: result.campaign.frequencyCaps,
      optimizationScore: result.campaign.optimization_score,
      servingStatus: result.campaign.serving_status,
      adServingOptimizationStatus: result.campaign.ad_serving_optimization_status,
      paymentMode: result.campaign.payment_mode,
      optimizationGoalSetting: result.campaign.optimization_goal_setting,
      trackingSetting: result.campaign.tracking_setting,
      audienceSetting: result.campaign.audience_setting,
      realTimeBiddingSetting: result.campaign.real_time_bidding_setting,
      metrics: result.metrics ? {
        clicks: Number(result.metrics.clicks),
        impressions: Number(result.metrics.impressions),
        costMicros: Number(result.metrics.costMicros),
        conversions: Number(result.metrics.conversions),
        conversionsValue: Number(result.metrics.conversionsValue),
        averageCpc: Number(result.metrics.averageCpc),
        ctr: Number(result.metrics.ctr),
        averagePosition: Number(result.metrics.averagePosition),
        interactionRate: Number(result.metrics.interactionRate),
        averageCpm: Number(result.metrics.averageCpm),
        videoViewRate: Number(result.metrics.videoViewRate),
        averageCpv: Number(result.metrics.averageCpv)
      } : undefined,
      segments: result.segments
    }));
  }

  private transformStatisticsResponse(data: any): CampaignStatistics[] {
    return data.results.map((result: any) => ({
      campaignId: result.campaign.id,
      campaignName: result.campaign.name,
      impressions: Number(result.metrics.impressions),
      clicks: Number(result.metrics.clicks),
      conversions: Number(result.metrics.conversions),
      costMicros: Number(result.metrics.costMicros),
      date: result.segments.date,
    }));
  }

  private transformCampaignRequest(campaign: Omit<Campaign, "id">): any {
    return {
      name: campaign.name,
      status: campaign.status,
      advertisingChannelType: campaign.advertisingChannelType,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
    };
  }
} 