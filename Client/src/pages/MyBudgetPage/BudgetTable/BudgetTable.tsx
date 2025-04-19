import React from "react";
import styles from "./BudgetTable.module.css";
import { CampaignCard } from "../CampaignCard/CampaignCard";

const data = [
  { icon: "▶️", name: "קמפיין A", spent: 800, budget: 1500 },
  { icon: "🔍", name: "קמפיין B", spent: 300, budget: 1000 },
  { icon: "📣", name: "קמפיין C", spent: 11200, budget: 1200 },
  { icon: "📘", name: "קמפיין D", spent: 400, budget: 800 },
  { icon: "▶️", name: "קמפיין A", spent: 800, budget: 1500 },
  { icon: "🔍", name: "קמפיין B", spent: 300, budget: 1000 },
  { icon: "📣", name: "קמפיין C", spent: 11200, budget: 1200 },
  { icon: "📘", name: "קמפיין D", spent: 400, budget: 800 },
  { icon: "▶️", name: "קמפיין A", spent: 800, budget: 1500 },
  { icon: "🔍", name: "קמפיין B", spent: 300, budget: 1000 },
  { icon: "📣", name: "קמפיין C", spent: 11200, budget: 1200 },
  { icon: "📘", name: "קמפיין D", spent: 400, budget: 800 },
  { icon: "▶️", name: "קמפיין A", spent: 800, budget: 1500 },
  { icon: "🔍", name: "קמפיין B", spent: 300, budget: 1000 },
  { icon: "📣", name: "קמפיין C", spent: 11200, budget: 1200 },
  { icon: "📘", name: "קמפיין D", spent: 400, budget: 800 },
];

export const BudgetTable: React.FC = () => {
  const totalSpent = data.reduce((sum, c) => sum + c.spent, 0);
  const totalBudget = data.reduce((sum, c) => sum + c.budget, 0);

  return (
    <div className={styles.table} dir="rtl">
      <div className={styles.header}>
        <div>תקציב</div>
        <div>הוצאה</div>
        <div>קמפיין</div>
      </div>
      {data.map((item) => (
        <CampaignCard key={item.name} {...item} />
      ))}
      <div className={styles.footer}>
        <div>סה״כ</div>
        <div>{totalSpent.toLocaleString()}$</div>
        <div>{totalBudget.toLocaleString()}$</div>
      </div>
    </div>
  );
};
