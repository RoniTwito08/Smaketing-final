// MobileView.tsx
import React from "react";
import mobileViewStyles from "./MobileView.module.css";

interface MobileViewProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function MobileView({ children, onClose }: MobileViewProps) {
  return (
    <div className={mobileViewStyles.overlay}>
      <div className={mobileViewStyles.phoneFrame}>
        <div className={mobileViewStyles.topBar}>
          <div className={mobileViewStyles.camera}></div>
        </div>
        <div className={mobileViewStyles.screen}>
          {children}
        </div>
        <div className={mobileViewStyles.bottomButton}>
          <button onClick={onClose}>סגור</button>
        </div>
      </div>
    </div>
  );
}
