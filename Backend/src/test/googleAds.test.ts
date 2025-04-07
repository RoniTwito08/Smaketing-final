import { GoogleAdsService } from '../services/googleAds/googleAds.service';
import { AuthService } from '../services/googleAds/auth.service';
import { Campaign, CampaignStatus, AdvertisingChannelType } from '../services/googleAds/types';
import { request } from 'gaxios';

jest.mock('../services/googleAds/auth.service');
jest.mock('gaxios');

describe('GoogleAdsService', () => {
  let googleAdsService: GoogleAdsService;
  const mockConfig = {
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
    developerToken: 'test-developer-token',
    refreshToken: 'test-refresh-token',
    customerId: 'test-customer-id',
    redirectUri: 'http://localhost',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    googleAdsService = new GoogleAdsService(mockConfig);
  });

  describe('getCampaigns', () => {
    it('should fetch and transform campaigns', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              campaign: {
                id: '123',
                name: 'Test Campaign',
                status: CampaignStatus.ENABLED,
                advertisingChannelType: AdvertisingChannelType.SEARCH,
                startDate: '2023-01-01',
                endDate: '2023-12-31',
              },
            },
          ],
        },
      };

      jest.spyOn(googleAdsService as any, 'getHeaders').mockResolvedValue({
        Authorization: 'Bearer test-token',
        'developer-token': mockConfig.developerToken,
      });

      (request as jest.Mock).mockResolvedValue(mockResponse);

      const campaigns = await googleAdsService.getCampaigns();
      expect(campaigns).toHaveLength(1);
      expect(campaigns[0].id).toBe('123');
      expect(campaigns[0].status).toBe(CampaignStatus.ENABLED);
    });

    it('should handle empty campaign results', async () => {
      const mockResponse = {
        data: {
          results: []
        }
      };

      jest.spyOn(googleAdsService as any, 'getHeaders').mockResolvedValue({
        Authorization: 'Bearer test-token',
        'developer-token': mockConfig.developerToken,
      });

      (request as jest.Mock).mockResolvedValue(mockResponse);

      const campaigns = await googleAdsService.getCampaigns();
      expect(campaigns).toHaveLength(0);
    });

    it('should log full campaign object structure', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              campaign: {
                resourceName: 'customers/1234567890/campaigns/111111111',
                id: '111111111',
                name: 'Test Campaign',
                status: CampaignStatus.ENABLED,
                advertisingChannelType: AdvertisingChannelType.SEARCH,
                startDate: '2024-03-20',
                endDate: '2024-12-31',
                targetSpend: {
                  cpcBidCeilingMicros: '1000000',
                  targetSpendingAmountMicros: '10000000'
                },
                manualCpc: {
                  enhancedCpcEnabled: true
                },
                networkSettings: {
                  targetGoogleSearch: true,
                  targetSearchNetwork: true,
                  targetContentNetwork: false,
                  targetPartnerSearchNetwork: false
                },
                geoTargetTypeSetting: {
                  positiveGeoTargetType: 'PRESENCE_OR_INTEREST',
                  negativeGeoTargetType: 'PRESENCE_OR_INTEREST'
                },
                campaignBudget: 'customers/1234567890/campaignBudgets/222222222',
                biddingStrategyType: 'MANUAL_CPC',
                accessibleBiddingStrategy: 'customers/1234567890/biddingStrategies/333333333',
                labels: ['customers/1234567890/labels/444444444'],
                frequencyCaps: [{
                  key: {
                    level: 'CREATIVE',
                    eventType: 'IMPRESSION',
                    timeUnit: 'DAY',
                    timeLength: 1
                  },
                  cap: 5
                }],
                optimization_score: '0.95',
                excludedParentAssetSetGroups: [],
                bidding_strategy: 'MANUAL_CPC',
                serving_status: 'SERVING',
                ad_serving_optimization_status: 'OPTIMIZE',
                payment_mode: 'PAYMENT_MODE_UNSPECIFIED',
                optimization_goal_setting: {
                  optimizationGoalTypes: ['OPTIMIZE_FOR_CONVERSION_VALUE']
                },
                tracking_setting: {
                  trackingUrl: 'https://example.com/tracking?id={campaignid}'
                },
                audience_setting: {
                  useAudienceGroupAssets: true
                },
                real_time_bidding_setting: {
                  optIn: false
                }
              },
              metrics: {
                clicks: '1000',
                impressions: '10000',
                costMicros: '2000000',
                conversions: '50',
                conversionsValue: '5000.50',
                averageCpc: '2000',
                ctr: '0.1',
                averagePosition: '1.5',
                interactionRate: '0.05',
                averageCpm: '200000',
                videoViewRate: '0.75',
                averageCpv: '1000'
              },
              segments: {
                date: '2024-03-20',
                hour: '14',
                quarter: 'Q1',
                month: '03',
                week: 'W12',
                dayOfWeek: 'WEDNESDAY',
                device: 'MOBILE',
                conversionAction: 'customers/1234567890/conversionActions/555555555',
                conversionActionCategory: 'DOWNLOAD',
                conversionActionName: 'app_download',
                externalConversionSource: 'GOOGLE_ANALYTICS'
              }
            }
          ]
        }
      };

      jest.spyOn(googleAdsService as any, 'getHeaders').mockResolvedValue({
        Authorization: 'Bearer test-token',
        'developer-token': mockConfig.developerToken,
      });

      (request as jest.Mock).mockResolvedValue(mockResponse);

      const campaigns = await googleAdsService.getCampaigns();
      console.log('Full Campaign Object:', JSON.stringify(mockResponse.data.results[0], null, 2));
      
      // Normal test assertions...
      expect(campaigns).toHaveLength(1);
    });
  });

  describe('getCampaignStatistics', () => {
    it('should fetch and transform campaign statistics', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              campaign: {
                id: '123',
                name: 'Test Campaign'
              },
              metrics: {
                impressions: '1000',
                clicks: '100',
                conversions: '10',
                costMicros: '1000000'
              },
              segments: {
                date: '2024-03-20'
              }
            }
          ]
        }
      };

      jest.spyOn(googleAdsService as any, 'getHeaders').mockResolvedValue({
        Authorization: 'Bearer test-token',
        'developer-token': mockConfig.developerToken,
      });

      (request as jest.Mock).mockResolvedValue(mockResponse);

      const stats = await googleAdsService.getCampaignStatistics('123', '2024-03-20', '2024-03-20');
      expect(stats).toHaveLength(1);
      expect(stats[0].campaignId).toBe('123');
      expect(stats[0].impressions).toBe(1000);
      expect(stats[0].clicks).toBe(100);
      expect(stats[0].conversions).toBe(10);
      expect(stats[0].costMicros).toBe(1000000);
      expect(stats[0].date).toBe('2024-03-20');
    });
  });

  describe('createCampaign', () => {
    it('should create and return a new campaign', async () => {
      const newCampaign = {
        name: 'New Test Campaign',
        status: CampaignStatus.ENABLED,
        advertisingChannelType: AdvertisingChannelType.SEARCH,
        startDate: '2024-03-20',
        endDate: '2024-12-31'
      };

      const mockResponse = {
        data: {
          results: [{
            campaign: {
              id: '456',
              resourceName: 'customers/1234567890/campaigns/456',
              ...newCampaign
            }
          }]
        }
      };

      jest.spyOn(googleAdsService as any, 'getHeaders').mockResolvedValue({
        Authorization: 'Bearer test-token',
        'developer-token': mockConfig.developerToken,
      });

      (request as jest.Mock).mockResolvedValue(mockResponse);

      const campaign = await googleAdsService.createCampaign(newCampaign);
      expect(campaign.id).toBe('456');
      expect(campaign.resourceName).toBe('customers/1234567890/campaigns/456');
      expect(campaign.name).toBe(newCampaign.name);
      expect(campaign.status).toBe(newCampaign.status);
      expect(campaign.advertisingChannelType).toBe(newCampaign.advertisingChannelType);
    });
  });

  describe('error handling', () => {
    it('should handle API errors gracefully', async () => {
      jest.spyOn(googleAdsService as any, 'getHeaders').mockResolvedValue({
        Authorization: 'Bearer test-token',
        'developer-token': mockConfig.developerToken,
      });

      (request as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(googleAdsService.getCampaigns()).rejects.toThrow('API Error');
    });
  });
}); 