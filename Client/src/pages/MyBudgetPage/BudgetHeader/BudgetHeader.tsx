import React from "react";
import styles from "./BudgetHeader.module.css";

interface BudgetHeaderProps {
  totalInvested: number;
}

export const BudgetHeader: React.FC<BudgetHeaderProps> = ({
  totalInvested,
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.amount}>${totalInvested.toLocaleString()}</div>
      <p>Invested</p>
    </div>
  );
};
