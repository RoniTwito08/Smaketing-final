// CampaignCard.tsx
import React from "react";
import styles from "./CampaignCard.module.css";

interface CampaignCardProps {
  campaign: any;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  return (
    <div className={styles.card}>
      <h3>{campaign.campaignName}</h3>
      <p>{campaign.campaignContent}</p>
      <p>
        <strong>תקציב:</strong> {campaign.budget}
      </p>
      <p>
        <strong>מטרה:</strong> {campaign.campaginPurpose}
      </p>
    </div>
  );
};

export default CampaignCard;
