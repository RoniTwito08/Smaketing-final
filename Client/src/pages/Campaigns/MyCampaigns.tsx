// MyCampaigns.tsx
import React, { useState, useEffect } from "react";
import styles from "./MyCampaigns.module.css";
import { useAuth } from "../../context/AuthContext";
import { config } from "../../config";
import CampaignCard from "./CampaignCard";

export const MyCampaigns: React.FC = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    fetchCampaigns();
  }, [user?._id]);
  

  const fetchCampaigns = async () => {
    if (!user?._id) return;
    try {
      const response = await fetch(
        `${config.apiUrl}/campaigns/user/${user._id}`
      );
      if (!response.ok) throw new Error("Failed to fetch campaigns");
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  return (
    <div className={styles.campaignsContainer}>
      <h2>הקמפיינים שלי</h2>
      {campaigns.length > 0 ? (
        campaigns.map((campaign) => (
          <CampaignCard key={campaign._id} campaign={campaign} />
        ))
      ) : (
        <p>לא נמצאו קמפיינים</p>
      )}
    </div>
  );
};

export default MyCampaigns;
