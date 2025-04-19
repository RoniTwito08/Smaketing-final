import React from "react";
import styles from "./TimeFilter.module.css";

export const TimeFilter: React.FC = () => {
  return (
    <select className={styles.select}>
      <option>This month</option>
      <option>Last month</option>
      <option>This year</option>
    </select>
  );
};
