export interface Campaign {
  id: string;
  resourceName?: string;
  name: string;
  status: CampaignStatus;
  advertisingChannelType: AdvertisingChannelType;
  startDate: string;
  endDate: string;
  scheduledTime?: string;
  adGroupId?: string;
  targetSpend?: {
    cpcBidCeilingMicros: string;
    targetSpendingAmountMicros: string;
  };
  manualCpc?: {
    enhancedCpcEnabled: boolean;
  };
  networkSettings?: {
    targetGoogleSearch: boolean;
    targetSearchNetwork: boolean;
    targetContentNetwork: boolean;
    targetPartnerSearchNetwork: boolean;
  };
  geoTargetTypeSetting?: {
    positiveGeoTargetType: string;
    negativeGeoTargetType: string;
  };
  campaignBudget?: string;
  biddingStrategyType?: string;
  accessibleBiddingStrategy?: string;
  labels?: string[];
  frequencyCaps?: Array<{
    key: {
      level: string;
      eventType: string;
      timeUnit: string;
      timeLength: number;
    };
    cap: number;
  }>;
  optimizationScore?: string;
  servingStatus?: string;
  adServingOptimizationStatus?: string;
  paymentMode?: string;
  optimizationGoalSetting?: {
    optimizationGoalTypes: string[];
  };
  trackingSetting?: {
    trackingUrl: string;
  };
  audienceSetting?: {
    useAudienceGroupAssets: boolean;
  };
  realTimeBiddingSetting?: {
    optIn: boolean;
  };
  metrics?: {
    clicks: number;
    impressions: number;
    costMicros: number;
    conversions: number;
    conversionsValue: number;
    averageCpc: number;
    ctr: number;
    averagePosition: number;
    interactionRate: number;
    averageCpm: number;
    videoViewRate: number;
    averageCpv: number;
  };
  segments?: {
    date: string;
    hour: string;
    quarter: string;
    month: string;
    week: string;
    dayOfWeek: string;
    device: string;
    conversionAction: string;
    conversionActionCategory: string;
    conversionActionName: string;
    externalConversionSource: string;
  };
}

export enum CampaignStatus {
  ENABLED = "ENABLED",
  PAUSED = "PAUSED",
  REMOVED = "REMOVED",
}

export enum AdvertisingChannelType {
  SEARCH = "SEARCH",
  DISPLAY = "DISPLAY",
  VIDEO = "VIDEO",
  SHOPPING = "SHOPPING",
}

export interface CampaignStatistics {
  campaignId: string;
  campaignName: string;
  impressions: number;
  clicks: number;
  conversions: number;
  costMicros: number;
  date: string;
}

export interface GoogleAdsConfig {
  clientId: string;
  clientSecret: string;
  developerToken: string;
  refreshToken: string;
  customerId: string;
  redirectUri: string;
}
