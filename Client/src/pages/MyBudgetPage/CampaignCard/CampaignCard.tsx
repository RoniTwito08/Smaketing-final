import React from "react";
import styles from "./CampaignCard.module.css";

interface CampaignCardProps {
  icon: React.ReactNode;
  name: string;
  spent: number;
  budget: number;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  icon,
  name,
  spent,
  budget,
}) => {
  return (
    <div className={styles.row}>
      <div className={styles.cell}>${budget.toLocaleString()}</div>
      <div className={styles.cell}>${spent.toLocaleString()}</div>
      <div className={styles.name}>
        {name} <span className={styles.icon}>{icon}</span>
      </div>
    </div>
  );
};
