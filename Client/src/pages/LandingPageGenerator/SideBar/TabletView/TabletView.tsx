import React from "react";
import tabletViewStyles from "./TabletView.module.css";

interface TabletViewProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function TabletView({ children, onClose }: TabletViewProps) {
  return (
    <div className={tabletViewStyles.overlay}>
      <div className={tabletViewStyles.tabletFrame}>
        <div className={tabletViewStyles.topBar}>
          <div className={tabletViewStyles.camera}></div>
        </div>
        <div className={tabletViewStyles.screen}>
          {children}
        </div>
        <div className={tabletViewStyles.bottomButton}>
          <button onClick={onClose}>סגור</button>
        </div>
      </div>
    </div>
  );
}
