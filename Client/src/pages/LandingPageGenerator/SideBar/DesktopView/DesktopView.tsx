// DesktopView.tsx
import React from "react";
import desktopViewStyles from "./DesktopView.module.css";

interface DesktopViewProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function DesktopView({ children, onClose }: DesktopViewProps) {
  return (
    <div className={desktopViewStyles.overlay}>
      <div className={desktopViewStyles.desktopFrame}>
        <div className={desktopViewStyles.topBar}>
          <div className={desktopViewStyles.camera}></div>
        </div>
        <div className={desktopViewStyles.screen}>
          {children}
        </div>
        <div className={desktopViewStyles.bottomButton}>
          <button onClick={onClose}>סגור</button>
        </div>
      </div>
    </div>
  );
}
