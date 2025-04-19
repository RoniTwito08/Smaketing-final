import React from "react";
import styles from "./BudgetPage.module.css";
import { BudgetTable } from "../BudgetTable/BudgetTable";
import { TimeFilter } from "../TimeFilter/TimeFilter";
import { BudgetHeader } from "../BudgetHeader/BudgetHeader"; // 👈 import this

export const BudgetPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <TimeFilter />
      </div>

      <BudgetHeader totalInvested={4500} />

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <BudgetTable />
      </div>
    </div>
  );
};
