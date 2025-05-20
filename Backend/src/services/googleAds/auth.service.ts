import { OAuth2Client } from "google-auth-library";
import { GoogleAdsConfig } from "./types";
import axios from "axios";

interface GoogleOAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
}
export class AuthService {
  private oauth2Client: OAuth2Client;
  private config: GoogleAdsConfig;

  constructor(config: GoogleAdsConfig) {

    this.config = config;
    this.oauth2Client = new OAuth2Client({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      redirectUri: config.redirectUri, // optional if needed later
    });

    this.oauth2Client.setCredentials({
      refresh_token: config.refreshToken,
    });
  }

  async getAccessToken(): Promise<string> {
    const { token } = await this.oauth2Client.getAccessToken();
    return token || "";
  }

  async refreshAccessToken(): Promise<void> {
    await this.oauth2Client.refreshAccessToken();
  }

  async exchangeCodeForTokens(
    code: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await axios.post<GoogleOAuthResponse>(
      "https://oauth2.googleapis.com/token",
      null,
      {
        params: {
          code,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          redirect_uri: this.config.redirectUri,
          grant_type: "authorization_code",
        },
      }
    );

    const data = response.data;

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  }

  generateAuthUrl(): string {
    const scopes = ["https://www.googleapis.com/auth/adwords"];

    return this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: scopes,
      redirect_uri: this.config.redirectUri,
    });
  }
}
