import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CampaignMetrics {
  campaignId: string;
  campaignName: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  date: string;
}

interface Props {
  data: CampaignMetrics[];
}

const GoogleAdsBarChart: React.FC<Props> = ({ data }) => {
  const chartData = data.map((metric) => ({
    date: metric.date,
    clicks: metric.clicks,
    cost: parseFloat(metric.cost.toFixed(2)),
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="clicks" fill="#8884d8" name="Clicks" />
          <Bar yAxisId="right" dataKey="cost" fill="#82ca9d" name="Cost ($)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoogleAdsBarChart;
