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

  useEffect(() => {
    fetchCampaigns();
  }, [customerId]);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/google-ads/campaigns`, {
        params: { customerId }
      });
      setCampaigns(response.data);
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Google Ads Analytics
        </Typography>

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
      </Paper>
    </Container>
  );
}; 