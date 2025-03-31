import dotenv from 'dotenv';
dotenv.config();

export const googleAdsConfig = {
  clientId: process.env.GOOGLE_ADS_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
  developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  refreshToken: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  customerId: '5764136313', 
  redirectUri: process.env.GOOGLE_ADS_REDIRECT_URI!
};