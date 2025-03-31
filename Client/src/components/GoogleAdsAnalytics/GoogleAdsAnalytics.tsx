import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import GoogleAdsRadarChart from "../charts/GoogleAdsRadarChart";
import GoogleAdsPieChart from "../charts/GoogleAdsPieChart";
import GoogleAdsChart from "../charts/GoogleAdsChart";
import GoogleAdsBarChart from "../charts/GoogleAdsBarChart";

interface DailyStat {
  date: string;
  clicks: number;
  impressions: number;
  costMicros: number;
  conversions: number;
}

interface CampaignStats {
  clicks: number;
  impressions: number;
  costMicros: number;
  conversions: number;
  ctr: number;
  dailyBreakdown?: DailyStat[];
}

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
  const [customerId, setCustomerId] = useState("517-512-4700");
  const [selectedCampaign, setSelectedCampaign] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [stats, setStats] = useState<CampaignStats | null>(null);

  useEffect(() => {
    fetchCampaigns();
  }, [customerId]);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/google-ads/campaigns`,
        {
          params: { customerId },
        }
      );
      setCampaigns(response.data);
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
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
            startDate: startDate.toISOString().split("T")[0],
            endDate: endDate.toISOString().split("T")[0],
          },
        }
      );
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch campaign statistics:", error);
    }
  };

  const radarData = stats
    ? [
        { metric: "Clicks", value: stats.clicks || 0 },
        { metric: "Impressions", value: stats.impressions || 0 },
        { metric: "CTR", value: stats.ctr || 0 },
        {
          metric: "CPC",
          value:
            stats.costMicros && stats.clicks
              ? stats.costMicros / stats.clicks / 1_000_000
              : 0,
        },
        { metric: "Conversions", value: stats.conversions || 0 },
      ]
    : [];

  const pieData = stats
    ? [
        {
          name: "Total Spend",
          value: parseFloat((stats.costMicros / 1_000_000).toFixed(2)),
        },
      ]
    : [];

  const areaData =
    stats?.dailyBreakdown?.map((day) => ({
      date: day.date,
      value: day.clicks,
    })) || [];

  const barData =
    stats?.dailyBreakdown?.map((day) => ({
      campaignId: selectedCampaign,
      campaignName:
        campaigns.find((c) => c.id === selectedCampaign)?.name || "",
      impressions: day.impressions,
      clicks: day.clicks,
      cost: day.costMicros / 1_000_000,
      conversions: day.conversions,
      date: day.date,
    })) || [];

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
              SelectProps={{ native: true }}
            >
              <option value="">Select a campaign</option>
              {Array.isArray(campaigns) &&
                campaigns.map((campaign) => (
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
              slots={{ textField: TextField }}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              slots={{ textField: TextField }}
              slotProps={{ textField: { fullWidth: true } }}
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
            <>
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
                        <Typography variant="h6">
                          {stats.impressions}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="subtitle2">Cost</Typography>
                        <Typography variant="h6">
                          ${(stats.costMicros / 1_000_000).toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="subtitle2">Conversions</Typography>
                        <Typography variant="h6">
                          {stats.conversions}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  Visual Analytics
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <GoogleAdsRadarChart data={radarData} />
              </Grid>
              <Grid item xs={12}>
                <GoogleAdsPieChart data={pieData} />
              </Grid>
              <Grid item xs={12}>
                <GoogleAdsChart data={areaData} />
              </Grid>
              <Grid item xs={12}>
                <GoogleAdsBarChart data={barData} />
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};
