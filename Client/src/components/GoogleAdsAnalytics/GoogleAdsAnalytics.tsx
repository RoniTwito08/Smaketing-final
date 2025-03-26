import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

interface Campaign {
  id: string;
  name: string;
  status: string;
  metrics?: {
    clicks: number;
    impressions: number;
    costMicros: number;
    conversions: number;
    ctr: number;
  };
}

export const GoogleAdsAnalytics: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [customerId, setCustomerId] = useState('517-512-4700');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [refreshToken, setRefreshToken] = useState(() => 
    localStorage.getItem('googleAdsRefreshToken') || ''
  );
  const [showTokenDialog, setShowTokenDialog] = useState(false);

  useEffect(() => {
    fetchCampaigns();
  }, [customerId]);

  const fetchCampaigns = async () => {
    try {
      const storedRefreshToken = localStorage.getItem('googleAdsRefreshToken');
      
      if (!storedRefreshToken) {
        console.error('No refresh token found in localStorage');
        // Either show an error message or trigger the auth flow
        handleGetRefreshToken();
        return;
      }

      console.log('Attempting to fetch campaigns with:', {
        customerId,
        refreshToken: storedRefreshToken.substring(0, 20) + '...', // Log partial token for security
        url: `${import.meta.env.VITE_API_URL}/api/google-ads/campaigns`
      });

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/google-ads/campaigns`, {
        params: { 
          customerId,
          refreshToken: storedRefreshToken
        }
      });
      setCampaigns(response.data);
    } catch (error: any) {
      console.error('Failed to fetch campaigns:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      if (error.response?.status === 401) {
        // If unauthorized, trigger new auth flow
        handleGetRefreshToken();
      }
    }
  };

  const fetchCampaignStats = async () => {
    if (!selectedCampaign || !startDate || !endDate) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/google-ads/campaigns/${selectedCampaign}/statistics`,
        {
          params: {
            customerId,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
          },
        }
      );
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch campaign statistics:', error);
    }
  };

  const handleGetRefreshToken = async () => {
    // Google OAuth configuration
    const clientId = '950730786723-fieqdsnl9pdu59ulecvbve0anmeak3av.apps.googleusercontent.com';
    const redirectUri = `${window.location.origin}/google-ads`;
    const scope = 'https://www.googleapis.com/auth/adwords';
    
    // Store current URL in sessionStorage
    sessionStorage.setItem('preAuthPath', window.location.pathname);
    
    // Redirect to Google's OAuth page
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    window.location.href = authUrl;
  };

  // Handle OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      const exchangeCode = async () => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/google-ads/auth/callback`, { code });
          handleNewRefreshToken(response.data.refreshToken);
          setShowTokenDialog(true);
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error('Error exchanging code:', error);
        }
      };
      
      exchangeCode();
    }
  }, []);

  // When receiving new refresh token
  const handleNewRefreshToken = (token: string) => {
    // Use the actual token from the OAuth response:
    setRefreshToken(token);
    localStorage.setItem('googleAdsRefreshToken', token);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Google Ads Analytics
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleGetRefreshToken}
          sx={{ mb: 3 }}
        >
          Get Refresh Token
        </Button>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Customer ID"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              helperText="Format: XXX-XXX-XXXX"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Select Campaign"
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Select a campaign</option>
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={fetchCampaignStats}
              disabled={!selectedCampaign || !startDate || !endDate}
            >
              Fetch Statistics
            </Button>
          </Grid>

          {stats && (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Campaign Statistics
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                      <Typography variant="subtitle2">Clicks</Typography>
                      <Typography variant="h6">{stats.clicks}</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography variant="subtitle2">Impressions</Typography>
                      <Typography variant="h6">{stats.impressions}</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography variant="subtitle2">Cost</Typography>
                      <Typography variant="h6">
                        ${(stats.costMicros / 1000000).toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography variant="subtitle2">Conversions</Typography>
                      <Typography variant="h6">{stats.conversions}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>

        <Dialog
          open={showTokenDialog}
          onClose={() => setShowTokenDialog(false)}
        >
          <DialogTitle>Your Refresh Token</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Copy this refresh token and add it to your .env file:
            </DialogContentText>
            <TextField
              fullWidth
              value={refreshToken}
              margin="dense"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowTokenDialog(false)}>Close</Button>
            <Button 
              onClick={() => {
                navigator.clipboard.writeText(refreshToken);
              }}
              color="primary"
            >
              Copy to Clipboard
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}; 